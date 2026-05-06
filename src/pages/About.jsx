import {
  Users,
  Award,
  Globe,
  Heart,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock3,
  BadgeCheck,
} from 'lucide-react';

const About = () => {
  const stats = [
    {
      label: 'Years In Service',
      value: '15+',
    },

    {
      label: 'Happy Travelers',
      value: '50K+',
    },

    {
      label: 'Cities Covered',
      value: '100+',
    },

    {
      label: 'Professional Chauffeurs',
      value: '500+',
    },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Customer First',

      description:
        'Your comfort and satisfaction are our highest priorities on every journey.',
    },

    {
      icon: <Award className="h-8 w-8" />,
      title: 'Premium Excellence',

      description:
        'We maintain luxury-level standards in service, vehicles, and professionalism.',
    },

    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Reliable Service',

      description:
        'Count on punctual pickups, smooth transfers, and dependable transportation.',
    },

    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Safety & Care',

      description:
        'Licensed drivers and carefully maintained vehicles ensure complete peace of mind.',
    },
  ];

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
                Trusted Airport Transportation Since 2010
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-8">

              Luxury Airport Transfers
              <span className="block text-accent-400">
                Built On Trust
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">

              AirportRide delivers executive airport transportation with
              professional chauffeurs, luxury vehicles, and exceptional
              customer service trusted by thousands of travelers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <section className="relative -mt-16 z-20 pb-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-premium p-10 lg:p-14">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >

                  <div className="text-5xl font-black text-primary-900 mb-3">
                    {stat.value}
                  </div>

                  <div className="text-gray-500 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* OUR STORY */}
      {/* ========================================================= */}

      <section className="pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-900 px-5 py-2 text-sm font-semibold mb-6">

                <Shield className="h-4 w-4 text-accent-500" />

                Our Journey
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight mb-8">

                More Than Just
                <span className="block">
                  Transportation
                </span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">

                <p>
                  Founded in 2010, AirportRide started with a clear mission:
                  deliver premium airport transportation that travelers can
                  genuinely rely on.
                </p>

                <p>
                  What began as a small fleet has evolved into a trusted luxury
                  transportation service serving thousands of customers across
                  major cities and airports.
                </p>

                <p>
                  Today, we combine modern booking technology, professional
                  chauffeurs, and executive-class vehicles to deliver a seamless
                  travel experience from pickup to destination.
                </p>
              </div>

              {/* Mini Features */}
              <div className="mt-10 space-y-4">

                {[
                  'Professional licensed chauffeurs',
                  'Luxury executive vehicles',
                  '24/7 support & live tracking',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle className="h-5 w-5 text-accent-500 shrink-0" />

                    <span className="text-gray-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">

              <div className="absolute -inset-4 bg-accent-500/10 blur-2xl rounded-[40px]"></div>

              <div className="relative rounded-[32px] overflow-hidden shadow-premium">

                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=900&fit=crop"
                  alt="Luxury Fleet"
                  className="w-full h-[650px] object-cover"
                />

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-card">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Premium Fleet
                      </p>

                      <h3 className="text-xl font-bold text-primary-900">
                        Executive Transportation
                      </h3>
                    </div>

                    <Clock3 className="h-10 w-10 text-accent-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* VALUES */}
      {/* ========================================================= */}

      <section className="pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">

            <h2 className="text-4xl md:text-5xl font-black text-primary-900 mb-6">

              Our Core Values
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">

              The principles that guide every journey, every interaction,
              and every customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-[28px] border border-gray-100 p-10 shadow-soft hover:shadow-premium hover:-translate-y-2 transition-all duration-500"
              >

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-900 text-accent-400 mb-8 group-hover:scale-110 transition-transform duration-300">

                  {value.icon}
                </div>

                <h3 className="text-2xl font-bold text-primary-900 mb-5">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY CHOOSE US */}
      {/* ========================================================= */}

      <section className="pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}
            <div className="relative">

              <div className="absolute -inset-4 bg-accent-500/10 blur-2xl rounded-[40px]"></div>

              <div className="relative rounded-[32px] overflow-hidden shadow-premium">

                <img
                  src="https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1200&h=900&fit=crop"
                  alt="Professional Chauffeur"
                  className="w-full h-[650px] object-cover"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-900 px-5 py-2 text-sm font-semibold mb-6">

                <Award className="h-4 w-4 text-accent-500" />

                Why Choose AirportRide
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight mb-8">

                Designed Around
                <span className="block">
                  Your Comfort
                </span>
              </h2>

              <div className="space-y-5">

                {[
                  'Professional licensed chauffeurs',
                  'Luxury executive fleet',
                  'Transparent fixed pricing',
                  '24/7 customer support',
                  'Real-time tracking & updates',
                  'Flight monitoring included',
                  'Easy online booking',
                  'Flexible cancellation policy',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >

                    <CheckCircle className="h-6 w-6 text-accent-500 shrink-0 mt-0.5" />

                    <span className="text-lg text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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

            Experience The
            <span className="block text-accent-400">
              AirportRide Difference
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">

            Book your next airport transfer with confidence and enjoy luxury
            transportation designed around comfort, punctuality, and reliability.
          </p>

          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-2xl bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold px-10 py-5 transition-all duration-300 shadow-premium hover:-translate-y-1"
          >
            Book Your Ride Today

            <ArrowRight className="ml-3 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;