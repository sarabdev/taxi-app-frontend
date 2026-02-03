import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Users, Briefcase, ArrowRight,
  CheckCircle, Clock, Shield, Star,
  RefreshCw, Calendar
} from 'lucide-react';
import { airports } from '../data/airports';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const Home = () => {
  const navigate = useNavigate();

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fromType: 'airport',
    fromLocation: '',
    fromPlaceId: '',
    toType: 'custom',
    toLocation: '',
    toPlaceId: '',
    passengers: 1,
    luggage: 1,
    isRoundTrip: false,
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });

  /* ---------------- Google Autocomplete (ADD ONLY) ---------------- */
  useEffect(() => {
    if (!GOOGLE_KEY) return;

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (!toInputRef.current) return;

    // const fromAuto = new window.google.maps.places.Autocomplete(fromInputRef.current);
    const toAuto = new window.google.maps.places.Autocomplete(toInputRef.current);

    // fromAuto.addListener('place_changed', () => {
    //   const place = fromAuto.getPlace();
    //   setFormData(prev => ({
    //     ...prev,
    //     fromLocation: place.formatted_address || '',
    //     fromPlaceId: place.place_id || '',
    //   }));
    // });

    toAuto.addListener('place_changed', () => {
      const place = toAuto.getPlace();
      setFormData(prev => ({
        ...prev,
        toLocation: place.formatted_address || '',
        toPlaceId: place.place_id || '',
      }));
    });
  };
  /* --------------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pricing = null;

    // 🔹 Call pricing API ONLY if placeIds exist
    if (formData.fromPlaceId && formData.toPlaceId) {
      try {
        const res = await fetch(`${API_BASE}/api/pricing/distance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromPlaceId: formData.fromPlaceId,
            toPlaceId: formData.toPlaceId,
            isRoundTrip: formData.isRoundTrip,
          }),
        });

        pricing = await res.json();
      } catch (err) {
        console.error('Pricing API failed', err);
      }
    }

    localStorage.setItem(
      'bookingData',
      JSON.stringify({
        ...formData,
        pricing, // 👈 ADDITIVE
      })
    );

    navigate('/booking/cars');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Premium airport taxi service with professional drivers and comfortable vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative -mt-16 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Ride</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* From Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From (Airport)
                  </label>

                  <div className="select-wrapper">
                    <select
                      className="select-field"
                      value={formData.fromPlaceId}
                      onChange={(e) => {
                        const airport = airports.find(
                          (a) => a.placeId === e.target.value
                        );

                        setFormData((prev) => ({
                          ...prev,
                          fromLocation: airport?.name || '',
                          fromPlaceId: airport?.placeId || '',
                        }));
                      }}
                      required
                    >
                      <option value="">Select airport</option>
                      {airports.map((airport) => (
                        <option key={airport.code} value={airport.placeId}>
                          {airport.name} ({airport.code})
                        </option>
                      ))}
                    </select>

                    <span className="select-icon">⌄</span>
                  </div>
                </div>

                {/* To Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    ref={toInputRef}
                    type="text"
                    name="toLocation"
                    value={formData.toLocation}
                    onChange={handleChange}
                    placeholder="Enter destination"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              {/* Date and Time Fields (UNCHANGED) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Pickup Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                      required
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center">
                Find Available Cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AirportRide?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the difference with our premium service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
              <p className="text-gray-600">
                99% on-time arrival rate with professional drivers
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Round-the-clock service for all your travel needs
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Licensed drivers and fully insured vehicles
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
              <p className="text-gray-600">
                Modern, clean vehicles with top-notch amenities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Get started in minutes and enjoy a comfortable journey
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

