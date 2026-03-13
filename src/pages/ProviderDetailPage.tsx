import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Globe, Check, Heart } from 'lucide-react';
import { useFavoritesStore, useAuthStore } from '../store';
import { profileAPI, inquiryAPI, reviewAPI } from '../services/api';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<'about' | 'gallery' | 'reviews'>('about');
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Wedding',
    numberOfGuests: '',
    eventLocation: '',
    message: '',
  });

  const inFavorites = provider ? isFavorite(provider.id) : false;

  useEffect(() => {
    loadProviderData();
  }, [id]);

  const loadProviderData = async () => {
    try {
      setLoading(true);
      
      // Load provider profile
      const profileResponse = await profileAPI.getProfileById(id!);
      setProvider(profileResponse.data.data);
      
      // Load reviews
      const reviewsResponse = await reviewAPI.getReviewsByProvider(id!);
      setReviews(reviewsResponse.data.data || []);
    } catch (error: any) {
      console.error('Error loading provider:', error);
      toast.error('Failed to load provider details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!provider) return;
    
    if (inFavorites) {
      removeFavorite(provider.id);
      toast.success('Removed from favorites');
    } else {
      addFavorite(provider.id);
      toast.success('Added to favorites');
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to send an inquiry');
      return;
    }

    setSubmitting(true);

    try {
      await inquiryAPI.createInquiry({
        providerId: id!,
        eventType: bookingForm.eventType,
        eventDate: bookingForm.eventDate,
        eventLocation: bookingForm.eventLocation,
        numberOfGuests: bookingForm.numberOfGuests ? parseInt(bookingForm.numberOfGuests) : undefined,
        message: bookingForm.message,
        contactInfo: {
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
        },
      });

      toast.success('Inquiry sent successfully! The provider will contact you soon.');
      
      // Reset form
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: 'Wedding',
        numberOfGuests: '',
        eventLocation: '',
        message: '',
      });
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Failed to send inquiry';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading provider details...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Provider not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{provider.businessName}</h1>
                {provider.verified && (
                  <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded text-sm">
                    <Check size={16} />
                    Verified Provider
                  </span>
                )}
              </div>
              <p className="text-xl text-primary-100 mb-4">{provider.tagline || provider.description?.substring(0, 100)}</p>
              <div className="flex items-center gap-6 text-primary-100">
                <div className="flex items-center gap-1">
                  <Star fill="#FCD34D" className="text-yellow-400" size={20} />
                  <span className="font-semibold text-white">{provider.averageRating?.toFixed(1) || '5.0'}</span>
                  <span>({provider.totalReviews || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{provider.location?.city}, {provider.location?.state}</span>
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
                      {provider.description}
                    </p>

                    <h3 className="text-xl font-semibold mb-3">Services Offered</h3>
                    <ul className="space-y-2 mb-6">
                      {provider.servicesOffered?.map((service: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>

                    {provider.pricing && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Pricing</h3>
                        <p className="text-gray-700">{provider.pricing}</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'gallery' && (
                  <div className="grid grid-cols-2 gap-4">
                    {provider.gallery?.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    )) || <p className="text-gray-500">No images available</p>}
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review: any) => (
                        <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{review.guestName || 'Anonymous'}</span>
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
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No reviews yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-2xl font-bold mb-4">Request Booking</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your name"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+1 (234) 567-8900"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Event Date *</label>
                  <input
                    type="date"
                    className="input"
                    required
                    value={bookingForm.eventDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Event Type *</label>
                  <select
                    className="input"
                    required
                    value={bookingForm.eventType}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                  >
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Birthday Party</option>
                    <option>Anniversary</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Event Location *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="New York, NY"
                    required
                    value={bookingForm.eventLocation}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventLocation: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Number of Guests</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="50"
                    value={bookingForm.numberOfGuests}
                    onChange={(e) => setBookingForm({ ...bookingForm, numberOfGuests: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Tell us about your event..."
                    required
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {provider.contactInfo?.phone && (
                  <a href={`tel:${provider.contactInfo.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                    <Phone size={18} />
                    {provider.contactInfo.phone}
                  </a>
                )}
                {provider.contactInfo?.email && (
                  <a href={`mailto:${provider.contactInfo.email}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                    <Mail size={18} />
                    {provider.contactInfo.email}
                  </a>
                )}
                {provider.contactInfo?.website && (
                  <a href={provider.contactInfo.website.startsWith('http') ? provider.contactInfo.website : `https://${provider.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                    <Globe size={18} />
                    {provider.contactInfo.website}
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
