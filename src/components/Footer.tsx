import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Facebook, Instagram, MessageCircle, Clock, User, MessageSquare, ArrowRight, Tractor, Droplets, Gavel, Wrench } from "lucide-react";
import logo from "@/assets/Sakthi agro logo1.png";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-primary-foreground relative overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FF6F00]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF6F00]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-2">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Sakthi Agro" className="h-14 sm:h-18 w-auto rounded-lg shadow-lg" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold opacity-100 tracking-wide">Sakthi Agro</h3>
              <p className="text-sm font-medium opacity-90 bg-white/10 px-3 py-1 rounded-full inline-block">
                Empowering Farmers Since 2012
              </p>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner for agricultural equipment sales, service, and genuine spare parts. We're committed to providing quality solutions for your farming needs.
            </p>
            {/* Business Hours */}
            <div className="mt-4 pt-4 border-t border-white/20 bg-white/5 rounded-lg p-4">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Business Hours</span>
              </h4>
              <div className="space-y-1 text-xs opacity-80">
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p>Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="relative">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b border-white/20 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#FF6F00]"></div>
              </h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-sm hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <div className="relative">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b border-white/20 relative">
                Products
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#FF6F00]"></div>
              </h3>
            </div>
            <ul className="space-y-4 text-sm opacity-90">
              <li>
                <Link to="/products#sprayers" className="hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Tractor className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Sprayers</span>
                </Link>
              </li>
              <li>
                <Link to="/products#pumps" className="hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Droplets className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Pumps & Irrigation</span>
                </Link>
              </li>
              <li>
                <Link to="/products#engines" className="hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Gavel className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Diesel & Petrol Engines</span>
                </Link>
              </li>
              <li>
                <Link to="/products#spare-parts" className="hover:text-[#FF6F00] transition-all duration-300 block py-2 flex items-center group hover:translate-x-2" target="_blank" rel="noopener noreferrer">
                  <Wrench className="h-4 w-4 mr-3 opacity-70 group-hover:opacity-100 group-hover:text-[#FF6F00] transition-all" />
                  <span>Spare Parts</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="relative">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b border-white/20 relative">
                Contact Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#FF6F00]"></div>
              </h3>
            </div>
            <ul className="space-y-5 mb-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white/10 p-2 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm opacity-90 leading-tight pt-1">
                  Coimbatore, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+919443600205" className="text-sm hover:text-[#FF6F00] transition-colors" target="_blank" rel="noopener noreferrer">
                  +91 94436 00205
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@sakthiagro.com" className="text-sm hover:text-[#FF6F00] transition-colors" target="_blank" rel="noopener noreferrer">
                  info@sakthiagro.com
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="tel:+919443600205" className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="Call Us">
                <Phone className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919443600205" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="WhatsApp Us">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Coimbatore%2C+Tamil+Nadu%2C+India" target="_blank" rel="noopener noreferrer" className="bg-[#FF6F00] hover:bg-[#E65100] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" aria-label="Get Directions">
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>


        <div className="border-t border-primary-foreground/20 mt-6 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2012 - {new Date().getFullYear()} Sakthi Agro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
