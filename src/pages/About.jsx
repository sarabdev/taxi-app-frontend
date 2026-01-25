import { Users, Award, Globe, Heart, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years in Service', value: '15+' },
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Cities Covered', value: '100+' },
    { label: 'Professional Drivers', value: '500+' },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Customer First',
      description: 'Your comfort and satisfaction are our top priorities. We go above and beyond to ensure every journey exceeds expectations.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in service quality, vehicle maintenance, and driver professionalism.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Reliability',
      description: 'Count on us for punctual, dependable service every time, with real-time tracking and 24/7 support.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Care & Safety',
      description: 'Your safety is paramount. All our drivers are licensed, trained, and our vehicles are regularly inspected.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AirportRide</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Leading the way in premium airport transportation services since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010, AirportRide began with a simple mission: to provide reliable, 
                  comfortable, and affordable airport transportation services. What started as a 
                  small fleet of vehicles has grown into a comprehensive transportation solution 
                  serving thousands of customers daily.
                </p>
                <p>
                  Over the years, we've expanded our services to cover major airports across the 
                  country, maintaining our commitment to excellence and customer satisfaction. 
                  Our success is built on the trust our customers place in us and the dedication 
                  of our professional drivers.
                </p>
                <p>
                  Today, AirportRide stands as a leader in airport transportation, combining 
                  cutting-edge technology with personalized service to ensure every journey is 
                  smooth, safe, and enjoyable.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Our fleet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that drive everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=600&fit=crop"
                alt="Professional driver"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose AirportRide?
              </h2>
              <div className="space-y-4">
                {[
                  'Professional, licensed, and experienced drivers',
                  'Modern, well-maintained fleet of vehicles',
                  'Competitive pricing with no hidden fees',
                  'Real-time tracking and notifications',
                  '24/7 customer support',
                  'Easy online booking and payment',
                  'Flight monitoring for airport pickups',
                  'Flexible cancellation policy',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the AirportRide Difference
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of satisfied customers who trust us for their transportation needs
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Book Your Ride Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

