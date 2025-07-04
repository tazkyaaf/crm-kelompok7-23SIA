import { Link } from "react-router-dom";
import { FaBox, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";

import htmLogo from '../../assets/lgputih.png'; // ← sesuaikan jika kamu simpan di src/assets

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={htmLogo}
                              alt="HTM Laundry Logo"
                              className="w-full h-full object-cover"
                            />
                          </div>
              <span className="text-xl font-bold">HTM LAUNDRY</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Solusi laundry terpercaya di Pekanbaru sejak 2019. Layanan antar-jemput, cepat, dan berkualitas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Layanan Kami</h4>
            <ul className="space-y-2">
              {['Regular Laundry', 'Express Laundry', 'Dry Cleaning', 'Cuci Sepatu', 'Cuci Karpet'].map((service) => (
                <li key={service}>
                  <Link 
                    to="/service" 
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Beranda', path: '/' },
                { name: 'Track Pesanan', path: '/orders' },
                { name: 'Membership', path: '/membership' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Hubungi Kami</h4>
            <div className="space-y-3 text-blue-100 text-sm">
              <div className="flex items-start space-x-3">
                <HiOutlineLocationMarker className="text-blue-400 text-lg mt-0.5" />
                <span>Jl. Sudirman No. 123, Pekanbaru, Riau</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 text-base" />
                <span>+62 761-123-456</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 text-base" />
                <span>info@htmlaundry.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <HiOutlineClock className="text-blue-400 text-lg mt-0.5" />
                <div className="space-y-1">
                  <div>Sen - Jum: 08.00 - 20.00</div>
                  <div>Sabtu: 08.00 - 18.00</div>
                  <div>Minggu: 09.00 - 17.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-blue-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © {currentYear} HTM Laundry. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-blue-200 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-blue-200 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}