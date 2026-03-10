# EventHub Frontend

Modern React frontend for the EventHub events service platform, styled with a professional outdoor/e-commerce theme.

## Features

### 🎨 Design
- **Dark Header** with red accents (inspired by outdoor e-commerce sites)
- **Modern UI** with clean cards and smooth transitions
- **Responsive Design** works on all devices
- **Professional Theme** with gray backgrounds and bold CTAs

### ⚡ Functionality
- **Browse Providers** by category, location, price, rating
- **Provider Profiles** with gallery, reviews, and booking forms
- **Favorites System** save providers you like
- **Real-time Search** find providers instantly
- **Booking Inquiries** contact providers directly

### 🛠️ Tech Stack
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API calls

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

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
