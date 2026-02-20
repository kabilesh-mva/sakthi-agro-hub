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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  // Function to handle admin access via keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // ALT + A to access admin
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        window.location.href = "/auth";
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border-b transition-all duration-300 ${
        scrolled
          ? "border-green-200 shadow-lg py-1.5"
          : "border-green-100 py-2.5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105 duration-300"
          >
            <img
              src={logo}
              alt="Sakthi Agro"
              className="h-10 md:h-14 lg:h-16 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] brightness-90 contrast-150 saturate-150"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#1E7A3C] font-bold transition-all duration-300 relative group text-sm lg:text-base flex hover:text-[#2E7D32]"
              >
                {link.label.split("").map((char, index) => (
                  <span
                    key={index}
                    className="group-hover:text-[#FF6F00] transition-colors duration-300"
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F00] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Language Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <LanguageToggle />
            <Button
              variant="default"
              size="sm"
              asChild
              className="relative overflow-hidden group bg-[#FF6F00] hover:bg-[#e08e00] text-white transition-colors duration-300 text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <a
                href="tel:+919443600205"
                className="flex items-center gap-2 transform transition-transform group-hover:-translate-y-1 duration-300"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 rounded-full hover:bg-green-700/30 text-gray-900 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 pb-6 bg-gradient-to-br from-[#1E7A3C] to-[#0E5322] rounded-lg mt-2 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2.5 text-white hover:text-[#FF6F00] font-medium transition-colors relative group text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F00] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-3 border-t border-white/20">
              <LanguageToggle />
              <Button
                variant="default"
                size="default"
                className="w-full bg-white text-[#1E7A3C] hover:bg-white/90 text-sm font-bold"
                asChild
              >
                <a
                  href="tel:+919443600205"
                  className="flex items-center justify-center gap-2"
                >
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
