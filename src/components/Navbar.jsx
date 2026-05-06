import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-card border-b border-gray-200'
          : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-primary-900 shadow-soft transition-transform duration-300 group-hover:scale-105">
                <Car className="h-6 w-6 text-accent-400" />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-extrabold tracking-tight text-primary-900">
                  AirportRide
                </span>

                <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  Premium Airport Transfers
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-semibold tracking-wide transition-all duration-300 ${isActive(item.path)
                    ? 'text-primary-900'
                    : 'text-gray-600 hover:text-primary-900'
                  }`}
              >
                {item.name}

                {isActive(item.path) && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent-500 rounded-full"></span>
                )}
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-xl bg-primary-900 hover:bg-primary-800 text-white font-semibold px-6 py-3 transition-all duration-300 shadow-soft hover:shadow-premium hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 text-primary-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen
            ? 'max-h-[400px] opacity-100 border-t border-gray-200'
            : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white/95 backdrop-blur-md px-4 py-5 space-y-2">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive(item.path)
                  ? 'bg-primary-900 text-white shadow-soft'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/booking"
            className="block w-full text-center rounded-xl bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold py-3 mt-4 transition-all duration-300 shadow-soft"
          >
            Book Your Ride
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;