import { Link } from 'react-router-dom';
import { 
  Menu, 
  User, 
  Heart, 
  MapPin,
  Phone,
  Clock,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { useAuthStore, useFavoritesStore } from '../../store';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const favorites = useFavoritesStore(state => state.favorites);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 text-white/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+12345678900" className="flex items-center gap-2 hover:text-primary-400 transition-colors group">
                <Phone size={14} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">+1 (234) 567-89-00</span>
              </a>
              <div className="hidden md:flex items-center gap-2 text-white/70">
                <Clock size={14} />
                <span>9:00 - 20:00 (24/7 Online)</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/how-it-works" className="hover:text-primary-400 transition-colors">How It Works</Link>
              <Link to="/become-provider" className="flex items-center gap-1 hover:text-primary-400 transition-colors group">
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-500 p-3 rounded-2xl shadow-medium group-hover:scale-105 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold bg-gradient-to-r from-dark-900 to-dark-700 bg-clip-text text-transparent">
                EventHub
              </div>
              <div className="text-xs text-gray-500 -mt-1">Events Made Perfect</div>
            </div>
          </Link>

          {/* Location */}
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors group">
            <MapPin size={18} className="text-primary-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Location</div>
              <div className="font-semibold text-sm">New York</div>
            </div>
          </button>

          {/* Browse Button */}
          <Link to="/browse" className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-medium hover:shadow-glow hover:scale-105 transition-all">
            <Menu size={20} />
            Browse Services
          </Link>

          {/* Search */}
          <div className="hidden lg:block flex-1 max-w-2xl">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search photographers, caterers, venues..."
                className="w-full px-5 py-3 pr-32 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all bg-white/50 backdrop-blur-sm placeholder:text-gray-400"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-glow transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard" className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors group relative">
                <User size={22} className="group-hover:scale-110 transition-transform" />
              </Link>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm">
                Login
              </Link>
            )}
            
            <Link to="/compare" className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors group relative">
              <BarChart3 size={22} className="group-hover:scale-110 transition-transform" />
            </Link>

            <Link to="/favorites" className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors group relative">
              <Heart size={22} className="group-hover:scale-110 transition-transform" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-medium animate-scale-in">
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
