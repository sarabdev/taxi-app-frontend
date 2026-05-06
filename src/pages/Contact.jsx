import { useState } from 'react';

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle,
  BadgeCheck,
  Shield,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Contact form submitted:', formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-surface-light overflow-hidden">

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative bg-hero-gradient text-white overflow-hidden">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/10 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">

          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-5 py-2 mb-8">

              <BadgeCheck className="h-4 w-4 text-accent-400" />

              <span className="text-sm font-medium text-gray-200">
                Available 24/7 For Support & Bookings
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-8">

              Get In Touch
              <span className="block text-accent-400">
                With AirportRide
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">

              Need help with a booking, airport transfer, or special request?
              Our team is available around the clock to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT SECTION */}
      {/* ========================================================= */}

      <section className="relative -mt-16 z-20 pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ========================================================= */}
            {/* CONTACT INFO */}
            {/* ========================================================= */}

            <div className="space-y-6">

              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  value1: '+1 (555) 123-4567',
                  value2: '24/7 Customer Support',
                },

                {
                  icon: Mail,
                  title: 'Email',
                  value1: 'info@airportride.com',
                  value2: 'support@airportride.com',
                },

                {
                  icon: MapPin,
                  title: 'Office',
                  value1: '123 Business Avenue',
                  value2: 'New York, NY 10001',
                },

                {
                  icon: Clock,
                  title: 'Business Hours',
                  value1: 'Office: Mon-Fri 9AM-6PM',
                  value2: 'Support Available 24/7',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[28px] border border-gray-100 p-8 shadow-soft hover:shadow-premium transition-all duration-300"
                >

                  <div className="flex items-start gap-5">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900 text-accent-400 shrink-0">

                      <item.icon className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-primary-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-700 leading-relaxed">
                        {item.value1}
                      </p>

                      <p className="text-gray-500 mt-1">
                        {item.value2}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Trust Box */}
              <div className="bg-primary-900 text-white rounded-[28px] p-8 shadow-premium">

                <div className="flex items-center gap-3 mb-5">

                  <Shield className="h-7 w-7 text-accent-400" />

                  <h3 className="text-2xl font-black">
                    Why Choose Us
                  </h3>
                </div>

                <div className="space-y-4">

                  {[
                    'Professional licensed chauffeurs',
                    'Luxury executive vehicles',
                    '24/7 support available',
                    'Fixed transparent pricing',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle className="h-5 w-5 text-accent-400 shrink-0 mt-0.5" />

                      <span className="text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* CONTACT FORM */}
            {/* ========================================================= */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-[32px] border border-gray-100 shadow-premium overflow-hidden">

                {/* Header */}
                <div className="bg-primary-900 px-8 py-6">

                  <h2 className="text-3xl font-bold text-white">
                    Send Us A Message
                  </h2>

                  <p className="text-gray-300 mt-2">
                    We usually respond within a few hours.
                  </p>
                </div>

                {/* Form */}
                <div className="p-8 lg:p-10">

                  {submitted && (
                    <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-800">

                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field h-14 border-gray-200 focus:ring-primary-900"
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field h-14 border-gray-200 focus:ring-primary-900"
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field h-14 border-gray-200 focus:ring-primary-900"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Subject *
                        </label>

                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="select-field h-14 border-gray-200 focus:ring-primary-900"
                          required
                        >
                          <option value="">
                            Select Subject
                          </option>

                          <option value="booking">
                            Booking Inquiry
                          </option>

                          <option value="support">
                            Customer Support
                          </option>

                          <option value="feedback">
                            Feedback
                          </option>

                          <option value="partnership">
                            Partnership
                          </option>

                          <option value="other">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Message *
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="7"
                        className="input-field border-gray-200 focus:ring-primary-900 resize-none"
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-primary-900 hover:bg-primary-800 text-white font-bold py-5 px-8 transition-all duration-300 shadow-card hover:shadow-premium hover:-translate-y-1 flex items-center justify-center"
                    >
                      Send Message

                      <Send className="ml-3 h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MAP */}
      {/* ========================================================= */}

      <section className="pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-premium overflow-hidden">

            {/* Header */}
            <div className="px-8 py-8 border-b border-gray-100">

              <h2 className="text-3xl font-black text-primary-900 mb-3">
                Visit Our Office
              </h2>

              <p className="text-gray-600 text-lg">
                Located in the heart of New York City.
              </p>
            </div>

            {/* Placeholder */}
            <div className="h-[450px] bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">

              <div className="text-center">

                <MapPin className="h-16 w-16 mx-auto mb-6 text-primary-900" />

                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  Interactive Map
                </h3>

                <p className="text-gray-700 text-lg">
                  123 Business Avenue, Suite 100
                </p>

                <p className="text-gray-500 mt-2">
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ */}
      {/* ========================================================= */}

      <section className="pb-28">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-black text-primary-900 mb-6">

              Frequently Asked Questions
            </h2>

            <p className="text-xl text-gray-600">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-6">

            {[
              {
                q: 'How do I book a ride?',
                a: 'You can easily book online through our website or contact our support team directly.',
              },

              {
                q: 'What payment methods do you accept?',
                a: 'We accept major credit cards, debit cards, and secure online payments.',
              },

              {
                q: 'Can I modify my booking?',
                a: 'Yes, bookings can be modified or canceled before pickup time.',
              },

              {
                q: 'Do you monitor flights?',
                a: 'Absolutely. We track flight arrivals to ensure timely airport pickups.',
              },

              {
                q: 'Are drivers licensed?',
                a: 'All chauffeurs are fully licensed, insured, and professionally trained.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-soft hover:shadow-premium transition-all duration-300"
              >

                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {faq.q}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="relative bg-hero-gradient text-white overflow-hidden py-24">

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 blur-3xl rounded-full"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-semibold mb-8">

            <BadgeCheck className="h-4 w-4 text-accent-400" />

            Trusted By Thousands Of Travelers
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">

            Ready To Book
            <span className="block text-accent-400">
              Your Airport Transfer?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">

            Experience luxury airport transportation with professional
            chauffeurs and premium service.
          </p>

          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-2xl bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold px-10 py-5 transition-all duration-300 shadow-premium hover:-translate-y-1"
          >
            Book Your Ride

            <ArrowRight className="ml-3 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;