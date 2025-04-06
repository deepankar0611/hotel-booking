import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hotel Booking</h3>
            <p className="text-gray-400">
              Find your perfect stay with our extensive selection of hotels worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-400 hover:text-white">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email: support@hotelbooking.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Hotel Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 