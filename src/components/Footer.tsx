import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/sakthi-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="Sakthi Agro" className="h-20 w-auto brightness-0 invert" />
            <p className="text-sm opacity-90">
              Empowering Farmers Since 2012
            </p>
            <p className="text-sm opacity-80">
              Your trusted partner for agricultural equipment sales, service, and spare parts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Sprayers</li>
              <li>Pumps & Irrigation</li>
              <li>Diesel & Petrol Engines</li>
              <li>Power Tools</li>
              <li>Spare Parts</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm opacity-90">
                  Coimbatore, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@sakthiagro.com" className="text-sm hover:text-accent transition-colors">
                  info@sakthiagro.com
                </a>
              </li>
            </ul>
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
