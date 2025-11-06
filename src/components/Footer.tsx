import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Facebook, Instagram, MessageCircle, Clock, User, MessageSquare, ArrowRight, Tractor, Droplets, Gavel, Wrench } from "lucide-react";
import logo from "@/assets/Sakthi agro logo1.png";

export const Footer = () => {
  return (
    <footer className="bg-[#2E7D32] text-primary-foreground relative overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Google Map Embed */}
      <div className="container mx-auto px-4 relative z-10 mb-12 sm:mb-16">
        <div className="bg-white rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 relative z-20 border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4029588148!2d76.9283123148274!3d11.01684499218435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8584f3d7b1a7f%3A0x708a9d7f9d7f!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sakthi Agro Location Map"
          ></iframe>
          <div className="absolute top-4 left-4 bg-[#2E7D32] text-white px-3 py-2 rounded-lg shadow-lg z-30 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Sakthi Agro | Authorized Dealer & Service Center</span>
          </div>
        </div>
        <div className="text-center mt-4 z-20 relative">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Coimbatore%2C+Tamil+Nadu%2C+India" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF6F00] hover:bg-[#E65100] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            <MapPin className="h-4 w-4" />
            Get Directions on Google Maps
          </a>
        </div>
      </div>
      
      {/* Inquiry Form */}
      <div className="container mx-auto px-4 mb-12 sm:mb-16 relative z-10 max-w-5xl mx-auto">
        <div className="bg-white text-[#2E7D32] p-6 sm:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-[#2E7D32]/20 relative z-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F5E9] rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF6F00] rounded-full translate-y-16 -translate-x-16 opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">Send Us an Inquiry</h3>
            <p className="text-[#2E7D32]/80 mb-6 text-center">Prefer instant chat? <a href="https://wa.me/919443600205" className="text-[#FF6F00] hover:underline">Click WhatsApp instead of filling the form!</a></p>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
                  <input
                    type="text"
                    id="name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F00] focus:border-transparent transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
                  <input
                    type="tel"
                    id="phone"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0] focus:border-transparent transition-all duration-300"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="product" className="block text-sm font-medium">Interested In</label>
                <select
                  id="product"
                  className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F00] focus:border-transparent transition-all duration-300"
                >
                  <option>Select a product category</option>
                  <option>Sprayers</option>
                  <option>Pumps & Irrigation</option>
                  <option>Engines</option>
                  <option>Spare Parts</option>
                  <option>Other Services</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F00] focus:border-transparent transition-all duration-300"
                    placeholder="Your Message"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-[#FF6F00] hover:bg-[#E65100] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                >
                  Send Inquiry <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Sakthi Agro" className="h-12 sm:h-16 w-auto" />
            </div>
            <p className="text-sm font-bold opacity-90">
              Empowering Farmers Since 2012
            </p>
            <p className="text-sm opacity-80">
              Your trusted partner for agricultural equipment sales, service, and genuine spare parts.
            </p>
            {/* Business Hours */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Business Hours
              </h4>
              <p className="text-xs opacity-80">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p className="text-xs opacity-80">Sun: 10:00 AM - 4:00 PM</p>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-[#FF6F00] hover:bg-[#E65100] text-white p-2 rounded-full transition-colors shadow-md" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white p-2 rounded-full border-white/20 transition-colors shadow-md" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2 rounded-full transition-colors shadow-md" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li>
                <Link to="/products#sprayers" className="hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Tractor className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Sprayers
                </Link>
              </li>
              <li>
                <Link to="/products#pumps" className="hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Droplets className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Pumps & Irrigation
                </Link>
              </li>
              <li>
                <Link to="/products#engines" className="hover:text-[#FF6F0] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Gavel className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Diesel & Petrol Engines
                </Link>
              </li>
              <li>
                <Link to="/products#spare-parts" className="hover:text-[#FF6F00] transition-colors block py-1 flex items-center group" target="_blank" rel="noopener noreferrer">
                  <Wrench className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Spare Parts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Contact Us
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm opacity-90 leading-tight">
                  Coimbatore, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+919443600205" className="text-sm hover:text-[#FF6F00] transition-colors" target="_blank" rel="noopener noreferrer">
                  +91 94436 00205
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@sakthiagro.com" className="text-sm hover:text-[#FF6F00] transition-colors" target="_blank" rel="noopener noreferrer">
                  info@sakthiagro.com
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              <a href="tel:+919443600205" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors" aria-label="Call Us">
                <Phone className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919443600205" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2 rounded-full transition-colors" aria-label="WhatsApp Us">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Coimbatore%2C+Tamil+Nadu%2C+India" target="_blank" rel="noopener noreferrer" className="bg-[#FF6F00] hover:bg-[#E65100] text-white p-2 rounded-full transition-colors" aria-label="Get Directions">
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Authorized Dealer Logos */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <h4 className="font-bold text-sm mb-4 text-white/80">Authorized Dealer for</h4>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 opacity-80">
            <div className="text-white/70 font-medium text-sm">Greaves</div>
            <div className="text-white/70 font-medium text-sm">Kisankraft</div>
            <div className="text-white/70 font-medium text-sm">Neptune</div>
            <div className="text-white/70 font-medium text-sm">Kirloskar</div>
            <div className="text-white/70 font-medium text-sm">Honda</div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2012 - {new Date().getFullYear()} Sakthi Agro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
