import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import { ServiceProvider, ServiceCategory } from '../types';

// Mock data
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    businessName: 'Capture Moments Studio',
    category: ServiceCategory.PHOTOGRAPHY,
    description: 'Professional wedding and event photography with 10+ years of experience',
    location: { city: 'New York', state: 'NY', country: 'USA' },
    contactInfo: { email: 'contact@capturemoments.com', phone: '+1-234-567-8900' },
    servicesOffered: ['Wedding Photography', 'Event Photography'],
    averageRating: 4.9,
    totalReviews: 127,
    verified: true,
    gallery: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500'],
    priceRange: '$800',
  },
  // Add more mock providers...
];

const BrowsePage = () => {
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [rating, setRating] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters Section */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <SlidersHorizontal size={20} />
              <span className="font-medium">Filters:</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="photography">Photography</option>
                  <option value="catering">Catering</option>
                  <option value="decoration">Decoration</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="venue">Venue</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input py-2"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="input py-2"
                >
                  <option value="all">Any Price</option>
                  <option value="0-500">$0 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000+">$1000+</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input py-2"
                >
                  <option value="all">All Ratings</option>
                  <option value="4+">4+ Stars</option>
                  <option value="4.5+">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Browse Service Providers</h1>
          <p className="text-gray-600">
            {mockProviders.length} providers found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
