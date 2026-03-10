import { Link } from 'react-router-dom';
import { ChevronRight, Camera, UtensilsCrossed, Palette, Music, MapPin, Cake } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import { ServiceProvider, ServiceCategory } from '../types';

// Mock data - replace with API calls
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    businessName: 'Capture Moments Studio',
    category: ServiceCategory.PHOTOGRAPHY,
    description: 'Professional wedding and event photography with 10+ years of experience',
    location: { city: 'New York', state: 'NY', country: 'USA' },
    contactInfo: { email: 'contact@capturemoments.com', phone: '+1-234-567-8900' },
    servicesOffered: ['Wedding Photography', 'Event Photography', 'Portrait Sessions'],
    averageRating: 4.9,
    totalReviews: 127,
    verified: true,
    gallery: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500'],
    priceRange: '$800',
  },
  {
    id: '2',
    businessName: 'Gourmet Delights Catering',
    category: ServiceCategory.CATERING,
    description: 'Exquisite catering services for all occasions',
    location: { city: 'Los Angeles', state: 'CA', country: 'USA' },
    contactInfo: { email: 'hello@gourmetdelights.com', phone: '+1-234-567-8901' },
    servicesOffered: ['Wedding Catering', 'Corporate Events', 'Private Parties'],
    averageRating: 4.8,
    totalReviews: 89,
    verified: true,
    gallery: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=500'],
    priceRange: '$25/person',
  },
  {
    id: '3',
    businessName: 'Elegant Events Decor',
    category: ServiceCategory.DECORATION,
    description: 'Transform your venue into a magical space',
    location: { city: 'Chicago', state: 'IL', country: 'USA' },
    contactInfo: { email: 'info@elegantevents.com', phone: '+1-234-567-8902' },
    servicesOffered: ['Wedding Decoration', 'Corporate Events', 'Themed Parties'],
    averageRating: 5.0,
    totalReviews: 64,
    verified: true,
    gallery: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'],
    priceRange: '$1,200',
  },
  {
    id: '4',
    businessName: 'Rhythm & Beats DJ',
    category: ServiceCategory.MUSIC_DJ,
    description: 'Professional DJ services with extensive music library',
    location: { city: 'Miami', state: 'FL', country: 'USA' },
    contactInfo: { email: 'dj@rhythmbeats.com', phone: '+1-234-567-8903' },
    servicesOffered: ['Wedding DJ', 'Corporate Events', 'Private Parties'],
    averageRating: 4.7,
    totalReviews: 152,
    verified: true,
    gallery: ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500'],
    priceRange: '$600',
  },
];

const categories = [
  {
    title: 'Photography',
    icon: Camera,
    count: '320+',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600',
    link: '/browse/photography',
  },
  {
    title: 'Catering',
    icon: UtensilsCrossed,
    count: '245+',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    link: '/browse/catering',
  },
  {
    title: 'Decoration',
    icon: Palette,
    count: '189+',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
    link: '/browse/decoration',
  },
  {
    title: 'Entertainment',
    icon: Music,
    count: '156+',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
    link: '/browse/entertainment',
  },
  {
    title: 'Cake & Desserts',
    icon: Cake,
    count: '198+',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600',
    link: '/browse/cake-desserts',
  },
  {
    title: 'Venue',
    icon: MapPin,
    count: '134+',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8a1c0?w=600',
    link: '/browse/venue',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Perfect <span className="text-primary-500">Service Providers</span>
              <br />
              for Your Events
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with photographers, caterers, decorators, and more. Make your event unforgettable.
            </p>
            <div className="flex gap-4">
              <Link to="/browse" className="btn btn-primary px-8 py-3 text-base">
                Browse Providers
              </Link>
              <Link to="/become-provider" className="btn btn-secondary px-8 py-3 text-base bg-transparent border-white text-white hover:bg-white/10">
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <Link to="/browse" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon size={24} />
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-gray-200">{category.count} Providers</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Providers</h2>
            <Link to="/browse" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Providers</h3>
              <p className="text-gray-600">
                Search and filter through hundreds of verified service providers in your area
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Send Inquiry</h3>
              <p className="text-gray-600">
                Contact providers, get quotes, and compare services to find the perfect match
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Enjoy</h3>
              <p className="text-gray-600">
                Confirm your booking and let professionals handle the rest for a perfect event
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join EventHub and connect with thousands of clients looking for your services
          </p>
          <Link to="/become-provider" className="btn btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-base">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
