import { useState } from 'react';
import { Star, MapPin, Phone, Mail, Globe, Check, Heart } from 'lucide-react';
import { useFavoritesStore } from '../store';
import toast from 'react-hot-toast';
import clsx from 'clsx';

// Mock data
const mockProvider = {
  id: '1',
  businessName: 'Capture Moments Studio',
  category: 'Photography',
  description: 'Professional wedding and event photography with 10+ years of experience. We specialize in capturing the authentic emotions and beautiful details of your special day.',
  location: { city: 'New York', state: 'NY', country: 'USA' },
  contactInfo: {
    email: 'contact@capturemoments.com',
    phone: '+1-234-567-8900',
    website: 'www.capturemoments.com',
  },
  servicesOffered: [
    'Wedding Photography (Full Day Coverage)',
    'Engagement Photo Shoots',
    'Corporate Event Photography',
    'Birthday & Anniversary Sessions',
  ],
  averageRating: 4.9,
  totalReviews: 127,
  verified: true,
  gallery: [
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
  ],
  priceRange: '$800',
};

const mockReviews = [
  {
    id: '1',
    guestName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing! They captured every precious moment of our wedding day.',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    guestName: 'Michael Chen',
    rating: 5,
    comment: 'Outstanding service from start to finish. Highly recommend!',
    createdAt: '2024-01-10',
  },
];

const ProviderDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState<'about' | 'gallery' | 'reviews'>('about');
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const inFavorites = isFavorite(mockProvider.id);

  const handleToggleFavorite = () => {
    if (inFavorites) {
      removeFavorite(mockProvider.id);
      toast.success('Removed from favorites');
    } else {
      addFavorite(mockProvider.id);
      toast.success('Added to favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{mockProvider.businessName}</h1>
                {mockProvider.verified && (
                  <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded text-sm">
                    <Check size={16} />
                    Verified Provider
                  </span>
                )}
              </div>
              <p className="text-xl text-primary-100 mb-4">Professional Wedding & Event Photography</p>
              <div className="flex items-center gap-6 text-primary-100">
                <div className="flex items-center gap-1">
                  <Star fill="#FCD34D" className="text-yellow-400" size={20} />
                  <span className="font-semibold text-white">{mockProvider.averageRating}</span>
                  <span>({mockProvider.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{mockProvider.location.city}, {mockProvider.location.state}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleFavorite}
              className={clsx(
                "btn flex items-center gap-2 px-6",
                inFavorites ? "bg-white text-primary-600" : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Heart size={20} fill={inFavorites ? "currentColor" : "none"} />
              {inFavorites ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <div className="flex gap-8 px-6">
                  {['about', 'gallery', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab as any)}
                      className={clsx(
                        "py-4 border-b-2 font-medium capitalize transition",
                        selectedTab === tab
                          ? "border-primary-600 text-primary-600"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {selectedTab === 'about' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {mockProvider.description}
                    </p>

                    <h3 className="text-xl font-semibold mb-3">Services Offered</h3>
                    <ul className="space-y-2 mb-6">
                      {mockProvider.servicesOffered.map((service, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTab === 'gallery' && (
                  <div className="grid grid-cols-2 gap-4">
                    {mockProvider.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.guestName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < review.rating ? "#FCD34D" : "none"}
                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">{review.createdAt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-2xl font-bold mb-4">Request Booking</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" className="input" placeholder="Your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="input" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" className="input" placeholder="+1 (234) 567-8900" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Event Date</label>
                  <input type="date" className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Event Type</label>
                  <select className="input">
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Birthday</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Tell us about your event..."
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Inquiry
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <a href={`tel:${mockProvider.contactInfo.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                  <Phone size={18} />
                  {mockProvider.contactInfo.phone}
                </a>
                <a href={`mailto:${mockProvider.contactInfo.email}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                  <Mail size={18} />
                  {mockProvider.contactInfo.email}
                </a>
                {mockProvider.contactInfo.website && (
                  <a href={`https://${mockProvider.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                    <Globe size={18} />
                    {mockProvider.contactInfo.website}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;
