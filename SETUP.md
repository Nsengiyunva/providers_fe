# EventHub Frontend - Backend Integration Guide

## 🚀 Quick Setup

### 1. Start Backend Services

First, make sure your EventHub backend is running:

```bash
# In the backend directory
cd eventhub-backend

# Start infrastructure
docker-compose up -d postgres redis kafka

# Start User Service (Terminal 1)
cd services/user-service
npm run dev

# Start API Gateway (Terminal 2)
cd services/api-gateway
npm run dev
```

Verify backend is running:
```bash
curl http://localhost:3000/health
```

### 2. Start Frontend

```bash
# In the frontend directory
cd eventhub-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 📡 API Endpoints Connected

### Authentication (User Service → API Gateway)
- ✅ `POST /api/auth/register` - User registration
- ✅ `POST /api/auth/login` - User login
- ✅ `POST /api/auth/logout` - User logout
- ✅ `GET /api/auth/me` - Get current user

### Profiles (Profile Service → API Gateway)
- ✅ `GET /api/profiles` - List providers with filters
- ✅ `GET /api/profiles/:id` - Get provider details
- ⏳ `POST /api/profiles` - Create profile (provider only)
- ⏳ `PATCH /api/profiles/:id` - Update profile (provider only)

### Inquiries (Inquiry Service → API Gateway)
- ✅ `POST /api/inquiries` - Send inquiry to provider
- ⏳ `GET /api/inquiries` - Get my inquiries
- ⏳ `GET /api/inquiries/:id` - Get inquiry details

### Reviews (Review Service → API Gateway)
- ✅ `GET /api/reviews?providerId=...` - Get provider reviews
- ⏳ `POST /api/reviews` - Create review (after booking)

## 🔐 Authentication Flow

### 1. Register New Account

**Frontend:** Go to `/register`

**API Call:**
```javascript
POST http://localhost:3000/api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "GUEST" // or "SERVICE_PROVIDER"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "GUEST"
    }
  }
}
```

### 2. Login

**Frontend:** Go to `/login`

**API Call:**
```javascript
POST http://localhost:3000/api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "GUEST"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

Token is automatically stored in localStorage and sent with subsequent requests.

## 📋 Features & Pages

### Home Page (`/`)
- ✅ Hero section
- ✅ Popular categories
- ✅ Featured providers
- ✅ How it works
- ✅ CTA sections

### Browse Page (`/browse`)
**Connected Features:**
- ✅ Fetch providers from API
- ✅ Filter by category
- ✅ Filter by location
- ✅ Filter by price range
- ✅ Filter by rating
- ✅ Real-time search

**API Call:**
```javascript
GET http://localhost:3000/api/profiles?category=Photography&location=New York&minRating=4.5
```

### Provider Detail Page (`/provider/:id`)
**Connected Features:**
- ✅ Load provider profile from API
- ✅ Display gallery images
- ✅ Show reviews from API
- ✅ Send inquiry form to API
- ✅ Save to favorites (localStorage)

**Booking Form Submission:**
```javascript
POST http://localhost:3000/api/inquiries
{
  "providerId": "provider-uuid",
  "eventType": "Wedding",
  "eventDate": "2024-06-15",
  "eventLocation": "New York, NY",
  "numberOfGuests": 150,
  "message": "Looking for photography services...",
  "contactInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900"
  }
}
```

### Login Page (`/login`)
- ✅ Email/password form
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Link to registration
- ✅ Error handling with toast notifications

### Register Page (`/register`)
- ✅ Guest vs Provider selection
- ✅ Form validation
- ✅ Password strength requirements
- ✅ Terms acceptance
- ✅ Error handling with toast notifications

## 🔧 Configuration

### Update API URL

Edit `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

Or for production:
```env
VITE_API_URL=https://api.eventhub.com
```

### CORS Configuration

Make sure your API Gateway allows requests from the frontend:

In `services/api-gateway/src/index.ts`:
```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 🧪 Testing the Integration

### 1. Test Registration
```bash
# Open browser to http://localhost:5173/register
# Fill form with:
# - Email: test@example.com
# - Password: Test123!@#
# - First Name: Test
# - Last Name: User
# - Role: GUEST

# Check backend logs for:
# - POST /api/auth/register
# - USER_CREATED event published to Kafka
# - User stored in PostgreSQL
```

### 2. Test Login
```bash
# Open browser to http://localhost:5173/login
# Use credentials from registration

# Check:
# - User logged in successfully
# - Token stored in localStorage
# - Redirected to homepage
# - Header shows logged-in state
```

### 3. Test Browse Providers
```bash
# Open http://localhost:5173/browse

# Check:
# - Providers loaded from API
# - Filters work (category, location, etc.)
# - Loading state displays
# - Empty state if no results
```

### 4. Test Send Inquiry
```bash
# Open any provider detail page
# Fill booking form
# Submit

# Check backend logs for:
# - POST /api/inquiries
# - INQUIRY_CREATED event published
# - Inquiry stored in database
```

## 📊 State Management

### Auth Store (Zustand)
```typescript
import { useAuthStore } from './store';

// In component:
const { user, isAuthenticated, login, logout } = useAuthStore();

// Check if logged in
if (isAuthenticated) {
  console.log('User:', user);
}
```

### Favorites Store (Zustand)
```typescript
import { useFavoritesStore } from './store';

const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
```

## 🐛 Troubleshooting

### CORS Errors
```
Access to fetch at 'http://localhost:3000/api/auth/login' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:** Add CORS middleware to API Gateway:
```bash
cd services/api-gateway
npm install cors
npm install --save-dev @types/cors
```

### Network Errors
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Solution:** Make sure API Gateway is running:
```bash
curl http://localhost:3000/health
```

### Authentication Errors
```
401 Unauthorized
```

**Solution:** 
1. Check token is stored in localStorage
2. Verify token hasn't expired
3. Try logging in again

### Empty Provider List
```
0 providers found
```

**Solution:** 
1. Check Profile Service is running
2. Seed database with sample providers
3. Check API response in browser DevTools

## 🎯 Next Steps

### Add More Services
1. Implement Payment Service integration
2. Add Notification Service for real-time updates
3. Connect Media Service for image uploads

### Provider Dashboard
Create `/dashboard` route for service providers to:
- View inquiries
- Manage bookings
- Update profile
- Upload gallery images

### Guest Dashboard
Create `/my-inquiries` route for guests to:
- View sent inquiries
- Track booking status
- Leave reviews

## 📚 API Documentation

Full API documentation available at:
```
http://localhost:3000/api-docs
```

(If you add Swagger/OpenAPI documentation to the backend)

## 🔒 Security Notes

- ✅ JWT tokens stored in localStorage
- ✅ Tokens sent in Authorization header
- ✅ Automatic token refresh (implement if needed)
- ✅ Logout clears tokens
- ⚠️ HTTPS required in production
- ⚠️ Rate limiting on sensitive endpoints
- ⚠️ Input validation on both frontend and backend

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify all services are running
4. Test API endpoints with curl or Postman

Happy coding! 🚀
