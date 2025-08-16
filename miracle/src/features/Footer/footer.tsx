import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Company Logo" className="h-10 mr-2" />
              <span className="text-2xl font-bold">ShopName</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for quality products and exceptional service since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Our Store</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <p className="text-gray-400">
                  123 Main Street
                  <br />
                  Cityville, ST 12345
                  <br />
                  United States
                </p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <a
                  href="tel:+11234567890"
                  className="text-gray-400 hover:text-white transition"
                >
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <a
                  href="mailto:info@shopname.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  info@shopname.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-gray-400" />
              <div className="text-gray-400">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat: 10:00 AM - 4:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopName. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
