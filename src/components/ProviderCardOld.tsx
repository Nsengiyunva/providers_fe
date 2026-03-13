import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Check, BarChart3 } from 'lucide-react';
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

  const handleToggleFavorite = () => {
    if (inFavorites) {
      removeFavorite(provider.id);
      toast.success('Removed from favorites');
    } else {
      addFavorite(provider.id);
      toast.success('Added to favorites');
    }
  };

  return (
    <div className="card group relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {provider.verified && (
          <span className="badge badge-verified flex items-center gap-1">
            <Check size={12} />
            Verified
          </span>
        )}
      </div>

      {/* Wishlist & Compare */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleToggleFavorite}
          className={clsx(
            "p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition",
            inFavorites && "text-red-500"
          )}
        >
          <Heart size={18} fill={inFavorites ? "currentColor" : "none"} />
        </button>
        <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
          <BarChart3 size={18} />
        </button>
      </div>

      {/* Provider Image */}
      <Link to={`/provider/${provider.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
          <img
            src={provider.gallery[0] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'}
            alt={provider.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Provider Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-primary-600 text-sm font-medium mb-1">
          {provider.category}
        </div>

        {/* Name */}
        <Link to={`/provider/${provider.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition line-clamp-1">
            {provider.businessName}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            <Star size={16} fill="#FCD34D" className="text-yellow-400" />
            <span className="font-semibold">{provider.averageRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-400">({provider.totalReviews} reviews)</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin size={14} />
          <span>{provider.location.city}, {provider.location.state}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {provider.description}
        </p>

        {/* Price Range & CTA */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">From</span>
            <span className="text-xl font-bold text-primary-600 ml-1">
              {provider.priceRange}
            </span>
          </div>
          <Link to={`/provider/${provider.id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
