export enum ServiceCategory {
  PHOTOGRAPHY = 'Photography',
  CATERING = 'Catering',
  DECORATION = 'Decoration',
  ENTERTAINMENT = 'Entertainment',
  VENUE = 'Venue',
  CAKE_DESSERTS = 'Cake & Desserts',
  MUSIC_DJ = 'Music & DJ',
  VIDEOGRAPHY = 'Videography',
  MAKEUP_HAIR = 'Makeup & Hair',
  OTHER = 'Other',
}

export interface ServiceProvider {
  id: string;
  businessName: string;
  category: ServiceCategory;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  servicesOffered: string[];
  averageRating: number;
  totalReviews: number;
  verified: boolean;
  gallery: string[];
  priceRange: string;
}

export interface Review {
  id: string;
  providerId: string;
  guestName: string;
  rating: number;
  comment: string;
  createdAt: string;
  photos?: string[];
}

export interface Inquiry {
  id: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  numberOfGuests?: number;
  message: string;
  status: 'pending' | 'responded' | 'accepted' | 'declined';
}
