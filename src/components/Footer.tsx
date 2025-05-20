import { Link } from 'react-router-dom';
import { Activity, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">AI Text Humanizer</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Transform AI-generated text into natural, human-sounding content 
              with our advanced AI humanizer tool.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-150">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-150">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-150">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-150">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} AI Text Humanizer. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm mt-4 md:mt-0">
            Made with ❤️ for clearer communication
          </p>
        </div>
      </div>
    </footer>
  );
}