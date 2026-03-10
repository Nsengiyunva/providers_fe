import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About EventHub</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white transition">Press</Link></li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Providers</h3>
            <ul className="space-y-2">
              <li><Link to="/become-provider" className="text-gray-400 hover:text-white transition">Become a Provider</Link></li>
              <li><Link to="/provider-login" className="text-gray-400 hover:text-white transition">Provider Login</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+1 (234) 567-89-00</li>
              <li>support@eventhub.com</li>
              <li>9:00 - 20:00 (24/7 Online)</li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
                  <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
                  <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest event planning tips and special offers
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded text-gray-900 focus:outline-none"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded transition">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
