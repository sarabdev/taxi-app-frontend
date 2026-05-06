import { Link } from 'react-router-dom';

import {
  Car,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Shield,
  Clock3,
  BadgeCheck,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-primary-950 text-gray-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/5 blur-3xl rounded-full"></div>

      {/* Top Border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent-500/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14">

          {/* ========================================================= */}
          {/* COMPANY */}
          {/* ========================================================= */}

          <div>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 mb-6 group"
            >

              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">

                <Car className="h-6 w-6 text-accent-400" />
              </div>

              <div>

                <h2 className="text-2xl font-black text-white tracking-tight">
                  AirportRide
                </h2>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">
                  Premium Transfers
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">

              Executive airport transportation with luxury vehicles,
              professional chauffeurs, and reliable service available
              24/7.
            </p>

            {/* Trust Items */}
            <div className="space-y-4 mb-8">

              <div className="flex items-center gap-3">

                <BadgeCheck className="h-5 w-5 text-accent-400 shrink-0" />

                <span className="text-sm text-gray-400">
                  Trusted by 10,000+ travelers
                </span>
              </div>

              <div className="flex items-center gap-3">

                <Shield className="h-5 w-5 text-accent-400 shrink-0" />

                <span className="text-sm text-gray-400">
                  Licensed & fully insured
                </span>
              </div>

              <div className="flex items-center gap-3">

                <Clock3 className="h-5 w-5 text-accent-400 shrink-0" />

                <span className="text-sm text-gray-400">
                  24/7 customer support
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">

              {[
                {
                  icon: Facebook,
                  href: '#',
                },

                {
                  icon: Twitter,
                  href: '#',
                },

                {
                  icon: Instagram,
                  href: '#',
                },

                {
                  icon: Linkedin,
                  href: '#',
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-accent-500 hover:border-accent-500 transition-all duration-300"
                >

                  <item.icon className="h-5 w-5 text-gray-400 group-hover:text-primary-950 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* QUICK LINKS */}
          {/* ========================================================= */}

          <div>

            <h3 className="text-white text-lg font-bold mb-8">
              Quick Links
            </h3>

            <ul className="space-y-5">

              {[
                {
                  name: 'Home',
                  path: '/',
                },

                {
                  name: 'About Us',
                  path: '/about',
                },

                {
                  name: 'Book A Ride',
                  path: '/booking',
                },

                {
                  name: 'Contact',
                  path: '/contact',
                },
              ].map((item) => (
                <li key={item.path}>

                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                  >

                    <span>
                      {item.name}
                    </span>

                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================= */}
          {/* SERVICES */}
          {/* ========================================================= */}

          <div>

            <h3 className="text-white text-lg font-bold mb-8">
              Services
            </h3>

            <ul className="space-y-5 text-gray-400">

              {[
                'Airport Transfers',
                'Corporate Travel',
                'Luxury Chauffeur Service',
                'Event Transportation',
                'Hourly Hire',
                'VIP Executive Travel',
              ].map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                >

                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400"></div>

                  <span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================= */}
          {/* CONTACT */}
          {/* ========================================================= */}

          <div>

            <h3 className="text-white text-lg font-bold mb-8">
              Contact Us
            </h3>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-4">

                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 shrink-0">

                  <Phone className="h-5 w-5 text-accent-400" />
                </div>

                <div>

                  <p className="text-white font-semibold">
                    +1 (555) 123-4567
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Available 24/7
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 shrink-0">

                  <Mail className="h-5 w-5 text-accent-400" />
                </div>

                <div>

                  <p className="text-white font-semibold">
                    info@airportride.com
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    support@airportride.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">

                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 shrink-0">

                  <MapPin className="h-5 w-5 text-accent-400" />
                </div>

                <div>

                  <p className="text-white font-semibold leading-relaxed">
                    123 Business Avenue
                    <br />
                    Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM */}
        {/* ========================================================= */}

        <div className="border-t border-white/10 mt-16 pt-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <p className="text-gray-500 text-sm text-center lg:text-left">
              © {new Date().getFullYear()} AirportRide. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">

              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;