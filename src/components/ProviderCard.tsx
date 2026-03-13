import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Check, BarChart3, ArrowRight } from 'lucide-react';
import { ServiceProvider } from '../types';
import { useFavoritesStore } from '../store';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface ProviderCardProps {
  provider: ServiceProvider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const inFavorites = isFavorite(provider.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inFavorites) {
      removeFavorite(provider.id);
      toast.success('Removed from favorites', {
        icon: '💔',
        style: {
          borderRadius: '12px',
          background: '#fff',
          color: '#333',
        },
      });
    } else {
      addFavorite(provider);
      toast.success('Added to favorites', {
        icon: '❤️',
        style: {
          borderRadius: '12px',
          background: '#fff',
          color: '#333',
        },
      });
    }
  };

  return (
    <div className="group relative">
      <Link to={`/provider/${provider.id}`}>
        <div className="card card-hover overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {provider.verified && (
                <span className="badge badge-verified shadow-medium backdrop-blur-sm">
                  <Check size={12} />
                  Verified
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleToggleFavorite}
                className={clsx(
                  "p-2.5 rounded-xl backdrop-blur-xl transition-all shadow-medium",
                  inFavorites 
                    ? "bg-primary-500 text-white" 
                    : "bg-white/90 text-gray-700 hover:bg-white"
                )}
              >
                <Heart size={18} fill={inFavorites ? "currentColor" : "none"} />
              </button>
              <button className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xl text-gray-700 hover:bg-white transition-all shadow-medium">
                <BarChart3 size={18} />
              </button>
            </div>

            {/* Image with overlay */}
            <img
              src={provider.gallery?.[0] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'}
              alt={provider.businessName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">
                {provider.category}
              </span>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  <Star size={14} fill="#FCD34D" className="text-yellow-400" />
                  <span className="font-bold text-sm">{provider.averageRating?.toFixed(1) || '5.0'}</span>
                </div>
                <span className="text-xs text-gray-400">({provider.totalReviews || 0})</span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-display text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {provider.businessName}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
              <MapPin size={14} className="text-gray-400" />
              <span>{provider.location?.city}, {provider.location?.state}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {provider.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Starting from</div>
                <div className="text-xl font-bold gradient-text">
                  {provider.priceRange || '$500'}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-primary-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                View Profile
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
