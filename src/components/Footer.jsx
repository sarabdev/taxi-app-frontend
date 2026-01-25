import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">AirportRide</span>
            </div>
            <p className="text-sm">
              Your trusted partner for premium airport taxi services. Comfortable, reliable, and professional transportation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-primary-500 transition-colors">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Airport Transfers</li>
              <li>Corporate Travel</li>
              <li>City Tours</li>
              <li>Event Transportation</li>
              <li>Hourly Rental</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-sm">24/7 Support</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm">info@airportride.com</p>
                  <p className="text-sm">support@airportride.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <p className="text-sm">123 Business Ave, Suite 100<br />New York, NY 10001</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AirportRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

