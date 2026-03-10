import axios from 'axios';

// API base URL - points to API Gateway
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    try {
      const authData = JSON.parse(token);
      if (authData?.state?.token) {
        config.headers.Authorization = `Bearer ${authData.state.token}`;
      }
    } catch (error) {
      console.error('Error parsing auth token:', error);
    }
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'GUEST' | 'SERVICE_PROVIDER';
  }) => api.post('/api/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),

  logout: () => api.post('/api/auth/logout'),

  getCurrentUser: () => api.get('/api/auth/me'),

  forgotPassword: (email: string) =>
    api.post('/api/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    api.post('/api/auth/reset-password', { token, newPassword }),
};

// Profile API
export const profileAPI = {
  getProfiles: (params?: {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    page?: number;
    limit?: number;
  }) => api.get('/api/profiles', { params }),

  getProfileById: (id: string) => api.get(`/api/profiles/${id}`),

  createProfile: (data: any) => api.post('/api/profiles', data),

  updateProfile: (id: string, data: any) => api.patch(`/api/profiles/${id}`, data),
};

// Inquiry API
export const inquiryAPI = {
  createInquiry: (data: {
    providerId: string;
    eventType: string;
    eventDate: string;
    eventLocation: string;
    numberOfGuests?: number;
    message: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
    };
  }) => api.post('/api/inquiries', data),

  getMyInquiries: () => api.get('/api/inquiries'),

  getInquiryById: (id: string) => api.get(`/api/inquiries/${id}`),
};

// Review API
export const reviewAPI = {
  getReviewsByProvider: (providerId: string) =>
    api.get(`/api/reviews?providerId=${providerId}`),

  createReview: (data: {
    providerId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }) => api.post('/api/reviews', data),
};
