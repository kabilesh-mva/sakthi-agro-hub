import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/sakthi-logo.png";
import { LanguageToggle } from "./LanguageToggle";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/products", label: "Products" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
    { to: "/auth", label: "Admin" },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b transition-all duration-300 ${
      scrolled ? 'border-border shadow-md py-2' : 'border-transparent py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 duration-300">
            <motion.img
              src={logo}
              alt="Sakthi Agro"
              className="h-10 md:h-12 w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-[#FF6F00] font-medium transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F00] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Language Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <Button variant="default" size="sm" asChild className="relative overflow-hidden group bg-[#2E7D32] hover:bg-[#1B5E20] transition-colors duration-300">
              <a href="tel:+919443600205" className="flex items-center gap-2 transform transition-transform group-hover:-translate-y-1 duration-300">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 text-foreground hover:text-[#FF6F00] font-medium transition-colors relative group"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F00] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
              <LanguageToggle />
              <Button variant="default" size="lg" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]" asChild>
                <a href="tel:+919443600205" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
