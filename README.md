# EventHub Frontend

Modern React frontend for the EventHub events service platform, styled with a professional outdoor/e-commerce theme. **Fully integrated with EventHub backend microservices.**

## 🎯 Features

### 🎨 Design
- **Dark Header** with red accents (inspired by outdoor e-commerce sites)
- **Modern UI** with clean cards and smooth transitions
- **Responsive Design** works on all devices
- **Professional Theme** with gray backgrounds and bold CTAs

### ⚡ Backend Integration
- ✅ **User Authentication** (Register, Login, Logout)
- ✅ **Browse Providers** with real-time filtering
- ✅ **Provider Profiles** loaded from API
- ✅ **Booking Inquiries** sent to backend
- ✅ **Reviews System** fetched from database
- ✅ **JWT Authentication** with token management
- ✅ **State Persistence** with localStorage

### 🔌 Connected API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login with JWT
- `GET /api/profiles` - Browse providers with filters
- `GET /api/profiles/:id` - Provider details
- `POST /api/inquiries` - Send booking inquiry
- `GET /api/reviews` - Fetch provider reviews

### 🛠️ Tech Stack
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- EventHub backend running on port 3000

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Backend Connection

Make sure EventHub backend is running:

```bash
# Check backend health
curl http://localhost:3000/health

# Should return: {"status":"healthy"}
```

See **[SETUP.md](./SETUP.md)** for detailed backend integration guide.

## 📋 Pages & Features

### 🏠 Home Page (`/`)
- Hero section with gradient
- Popular categories grid
- Featured providers (fetched from API)
- How it works section
- Provider CTA

### 🔍 Browse Page (`/browse`)
- **Filters**: Category, Location, Price, Rating
- Grid layout with provider cards
- Real-time API data loading
- Empty states and loading indicators

### 👤 Provider Detail (`/provider/:id`)
- Profile loaded from API
- Image gallery
- Reviews from database
- **Booking Form** (sends to `/api/inquiries`)
  - Full name, email, phone
  - Event date, type, location
  - Number of guests
  - Message
- Contact information

### 🔐 Login Page (`/login`)
- Email/password authentication
- Remember me checkbox
- Forgot password link
- Error handling with toast

### ✍️ Register Page (`/register`)
- Guest vs Service Provider selection
- Form validation
- Password strength requirements
- Terms acceptance
- Connects to `/api/auth/register`

## 🔌 API Integration

### Authentication

```typescript
import { useAuthStore } from './store';

const { login, register, logout, isAuthenticated, user } = useAuthStore();

// Register
await register({
  email: 'user@example.com',
  password: 'SecurePass123!',
  firstName: 'John',
  lastName: 'Doe',
  role: 'GUEST'
});

// Login
await login('user@example.com', 'SecurePass123!');

// Check auth status
if (isAuthenticated) {
  console.log('Logged in as:', user.email);
}
```

### Fetching Providers

```typescript
import { profileAPI } from './services/api';

// Get all providers
const response = await profileAPI.getProfiles();

// Filter providers
const filtered = await profileAPI.getProfiles({
  category: 'Photography',
  location: 'New York',
  minRating: 4.5
});

// Get provider details
const provider = await profileAPI.getProfileById('provider-id');
```

### Sending Inquiries

```typescript
import { inquiryAPI } from './services/api';

await inquiryAPI.createInquiry({
  providerId: 'provider-id',
  eventType: 'Wedding',
  eventDate: '2024-06-15',
  eventLocation: 'New York, NY',
  numberOfGuests: 150,
  message: 'Looking for photography services...',
  contactInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-234-567-8900'
  }
});
```

## 🎨 Styling Theme

### Colors
```css
Primary Red: #ed1515 (buttons, links, accents)
Dark Header: #3d3d3d (navigation background)
Light Background: #f9fafb (page background)
White Cards: #ffffff (content cards)
```

### Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: Bold red, rounded, uppercase text
- **Inputs**: Gray border, focus ring on interaction
- **Badges**: Small pills with background color

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=EventHub
```

### CORS Setup

Add to your API Gateway (`services/api-gateway/src/index.ts`):

```typescript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

Output in `dist/` directory.

### Deploy

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## 🧪 Testing Integration

### 1. Test Registration
```bash
# Open http://localhost:5173/register
# Fill form and submit
# Check backend logs for USER_CREATED event
```

### 2. Test Login
```bash
# Open http://localhost:5173/login
# Login with registered credentials
# Token should be stored in localStorage
```

### 3. Test Browse
```bash
# Open http://localhost:5173/browse
# Providers should load from API
# Try filtering by category
```

### 4. Test Booking
```bash
# Open any provider detail page
# Fill booking form
# Submit inquiry
# Check backend for INQUIRY_CREATED event
```

## 🐛 Troubleshooting

### CORS Errors
Add CORS middleware to API Gateway (see Configuration above)

### Connection Refused
Verify backend is running: `curl http://localhost:3000/health`

### 401 Unauthorized
Check if token is valid, try logging in again

### No Providers Showing
1. Check Profile Service is running
2. Seed database with sample data
3. Check browser console for errors

See **[SETUP.md](./SETUP.md)** for detailed troubleshooting.

## 📁 Project Structure

```
eventhub-frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation with auth state
│   │   │   └── Footer.tsx          
│   │   └── ProviderCard.tsx        # Provider display card
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── BrowsePage.tsx          # Browse with API filters
│   │   ├── ProviderDetailPage.tsx  # Details + booking form
│   │   ├── LoginPage.tsx           # Authentication
│   │   └── RegisterPage.tsx        # User registration
│   ├── services/
│   │   └── api.ts                  # Axios API client + endpoints
│   ├── store/
│   │   └── index.ts                # Zustand stores (auth, favorites)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main app with routing
│   └── main.tsx                    # Entry point
├── .env                            # Environment variables
├── SETUP.md                        # Backend integration guide
└── README.md                       # This file
```

## 🔐 Security

- ✅ JWT tokens stored in localStorage
- ✅ Tokens sent in Authorization header
- ✅ Automatic logout on 401 responses
- ✅ Password validation (8+ chars, uppercase, number, special)
- ⚠️ Use HTTPS in production
- ⚠️ Implement refresh token rotation
- ⚠️ Add rate limiting

## 📚 Documentation

- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Backend Repo**: eventhub-backend/
- **API Docs**: http://localhost:3000/api-docs (if implemented)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test with backend
5. Submit pull request

## 📄 License

MIT License

---

Built with ❤️ using React + TypeScript + Tailwind CSS

**Backend:** Node.js microservices with Kafka, Redis, PostgreSQL
**Frontend:** Modern React SPA with full API integration

## Project Structure

```
eventhub-frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Top navigation
│   │   │   └── Footer.tsx          # Bottom footer
│   │   └── ProviderCard.tsx        # Service provider card
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── BrowsePage.tsx          # Browse providers
│   │   └── ProviderDetailPage.tsx  # Provider details
│   ├── store/
│   │   └── index.ts                # Zustand stores
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Features Overview

### Homepage
- **Hero Section** with gradient background and CTAs
- **Popular Categories** with images and counts
- **Featured Providers** in card grid
- **How It Works** section
- **Provider CTA** section

### Browse Page
- **Advanced Filters**: Category, Location, Price, Rating
- **Grid Layout** with provider cards
- **Sticky Filter Bar** stays visible while scrolling
- **Results Count** shows number of providers

### Provider Detail Page
- **Header** with rating, location, verified badge
- **Tabbed Content**: About, Gallery, Reviews
- **Sticky Booking Form** in sidebar
- **Contact Information** with clickable links
- **Image Gallery** with responsive grid

### Provider Cards
- **Image** with hover effect
- **Category Badge** in brand color
- **Rating Stars** with review count
- **Location** with icon
- **Price Range** prominently displayed
- **Favorite Button** with heart icon
- **Compare Button** for side-by-side comparison

## Styling Theme

### Colors
```css
Primary Red: #ed1515 (buttons, links, accents)
Dark Header: #3d3d3d (navigation background)
Light Background: #f9fafb (page background)
White Cards: #ffffff (content cards)
```

### Typography
- Font Family: Inter (modern, clean)
- Headers: Bold, large sizes
- Body: Regular weight, comfortable reading
- Buttons: Uppercase, medium weight

### Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: Bold red, rounded, uppercase text
- **Inputs**: Gray border, focus ring on interaction
- **Badges**: Small pills with background color

## API Integration

### Backend Connection

Update `vite.config.ts` proxy to point to your API Gateway:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Your API Gateway
      changeOrigin: true,
    },
  },
}
```

### Example API Calls

```typescript
// Get providers
const providers = await axios.get('/api/profiles');

// Get provider details
const provider = await axios.get(`/api/profiles/${id}`);

// Send inquiry
await axios.post('/api/inquiries', inquiryData);

// Get reviews
const reviews = await axios.get(`/api/reviews?providerId=${id}`);
```

## State Management

### Auth Store
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();
```

### Favorites Store
```typescript
const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
```

## Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#your-color', // Main brand color
  },
  dark: {
    800: '#your-dark-color', // Header background
  },
}
```

### Add New Pages

1. Create page in `src/pages/`
2. Add route in `src/App.tsx`
3. Link from navigation

### Add New Components

```bash
src/components/YourComponent.tsx
```

## Performance

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Use WebP format
- **Lazy Loading**: Images load as you scroll
- **Caching**: Zustand persists to localStorage

## Deployment

### Build

```bash
npm run build
```

Output in `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
```

### Deploy to AWS S3

```bash
aws s3 sync dist/ s3://your-bucket-name
```

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=EventHub
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues or questions:
- Create an issue on GitHub
- Email: support@eventhub.com

---

Built with ❤️ using React + TypeScript + Tailwind CSS
