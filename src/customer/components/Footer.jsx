import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    aboutUs: ["About us", "Our story", "Careers", "Philosophy", "Contact us"],
    company: ["Our team", "Press", "Terms", "How it works", "Blog"],
    services: ["Pickup", "Wash & Dry", "Delivery", "Laundry"],
    checkIn: ["Drop off", "Status"],
  };

  return (
    <footer className="bg-gradient-to-r from-blue-400 to-blue-500 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">HTM LAUNDRY</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Professional laundry service with pickup and delivery. Fresh,
              clean clothes every time with premium care and convenience.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-bold text-white mb-4">About us</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link}>
                  <button className="text-blue-100 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <button className="text-blue-100 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <button className="text-blue-100 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {/* Check in visit */}
          <div>
            <h4 className="font-bold text-white mb-4">Check in visit</h4>
            <ul className="space-y-2">
              {footerLinks.checkIn.map((link) => (
                <li key={link}>
                  <button className="text-blue-100 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
            {/* Social Media Icons */}
            <div className="flex space-x-2 mt-6">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">ig</span>
              </div>
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-blue-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              © 2024 HTM Laundry. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-blue-100 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-blue-100 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
