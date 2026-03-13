import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import { profileAPI } from '../services/api';
import { ServiceProvider } from '../types';
import toast from 'react-hot-toast';

const BrowsePage = () => {
  const { category } = useParams<{ category?: string }>();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    category: category || 'all',
    location: '',
    priceRange: 'all',
    rating: 'all',
  });

  useEffect(() => {
    loadProviders();
  }, [filters]);

  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);

  const loadProviders = async () => {
    try {
      setLoading(true);
      
      const params: any = {};
      
      if (filters.category && filters.category !== 'all') {
        params.category = filters.category;
      }
      
      if (filters.location) {
        params.location = filters.location;
      }
      
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-');
        if (min) params.minPrice = parseInt(min);
        if (max && max !== '+') params.maxPrice = parseInt(max);
      }
      
      if (filters.rating !== 'all') {
        params.minRating = parseFloat(filters.rating.replace('+', ''));
      }

      const response = await profileAPI.getProfiles(params);
      setProviders(response.data.data || []);
    } catch (error: any) {
      console.error('Error loading providers:', error);
      toast.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

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
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="Photography">Photography</option>
                  <option value="Catering">Catering</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Venue">Venue</option>
                  <option value="Cake & Desserts">Cake & Desserts</option>
                  <option value="Music & DJ">Music & DJ</option>
                  <option value="Videography">Videography</option>
                  <option value="Makeup & Hair">Makeup & Hair</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city or state..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="input py-2"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="input py-2"
                >
                  <option value="all">Any Price</option>
                  <option value="0-500">$0 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2000">$1,000 - $2,000</option>
                  <option value="2000+">$2,000+</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="input py-2"
                >
                  <option value="all">All Ratings</option>
                  <option value="4+">4+ Stars</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.8+">4.8+ Stars</option>
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
            {loading ? 'Loading...' : `${providers.length} providers found`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading providers...</p>
            </div>
          </div>
        ) : providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No providers found</p>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
