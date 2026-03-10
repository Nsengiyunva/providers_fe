import { Link } from 'react-router-dom';
import { 
  Menu, 
  // Search, 
  User, 
  Heart, 
  MapPin,
  Phone,
  Clock,
  BarChart3
} from 'lucide-react';
import { useAuthStore, useFavoritesStore } from '../../store';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const favorites = useFavoritesStore(state => state.favorites);

  return (
    <header className="bg-dark-800 text-white">
      {/* Top Bar */}
      <div className="bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+12345678900" className="flex items-center gap-2 hover:text-primary-400 transition">
                <Phone size={14} />
                +1 (234) 567-89-00
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} />
                9:00 - 20:00 (24/7 Online)
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/how-it-works" className="hover:text-primary-400 transition">How It Works</Link>
              <Link to="/become-provider" className="hover:text-primary-400 transition">Become a Provider</Link>
              <Link to="/help" className="hover:text-primary-400 transition">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold flex items-center gap-2">
              <span className="text-primary-600 text-3xl">🎉</span>
              <div>
                <div className="text-white">EVENTHUB</div>
                <div className="text-xs text-gray-400 font-normal -mt-1">Events Made Easy</div>
              </div>
            </div>
          </Link>

          {/* Location */}
          <button className="flex items-center gap-2 hover:text-primary-400 transition">
            <MapPin size={18} />
            <span>New York</span>
          </button>

          {/* Catalog Button */}
          <Link to="/browse" className="btn btn-primary flex items-center gap-2 px-8">
            <Menu size={20} />
            BROWSE SERVICES
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for photographers, caterers, venues..."
                className="w-full px-4 py-2.5 pr-24 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-primary-600 hover:bg-primary-700 px-6 rounded-r font-medium transition">
                SEARCH
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="hover:text-primary-400 transition relative">
                <User size={24} />
              </Link>
            ) : (
              <Link to="/login" className="hover:text-primary-400 transition relative">
                <User size={24} />
              </Link>
            )}
            
            <Link to="/compare" className="hover:text-primary-400 transition relative">
              <BarChart3 size={24} />
            </Link>

            <Link to="/favorites" className="hover:text-primary-400 transition relative">
              <Heart size={24} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
