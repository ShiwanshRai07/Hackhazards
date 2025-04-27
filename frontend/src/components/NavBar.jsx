import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-navy/90 backdrop-blur-md shadow-lg border-b border-white/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:pr-24 lg:pl-20">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart3 className="text-fluvio mr-2" size={24} />
              <span className="text-2xl font-bold gradient-text">
                Truth <span className="text-white">Stream</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <a
                  href="#features"
                  className="text-gray-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-white after:transition-all transition-colors duration-300 hover:text-monad
"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-white after:transition-all transition-colors duration-300 hover:text-monad"
                >
                  How It Works
                </a>
                <a
                  href="#technology"
                  className="text-gray-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-white after:transition-all transition-colors duration-300 hover:text-monad"
                >
                  Technology
                </a>
                <Link to="/login">
                  <Button
                    className="border-2 
                    border-gradient-to-r 
                    from-fluvio 
                    to-monad 
                    gradient-text
                    bg-transparent 
                    font-bold  
                    transition-all 
                    duration-300 
                    ease-in-out
                    hover:scale-105 
                    hover:shadow-[0_4px_20px_rgba(60,189,223,0.3)] 
                    hover:saturate-150 
                    hover:brightness-100  "
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Button className="btn-primary">Subscribe</Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with improved animation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-b border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-3">
            {isHomePage ? (
              <>
                <a
                  href="#features"
                  className="block py-2 px-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="block py-2 px-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a
                  href="#technology"
                  className="block py-2 px-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Technology
                </a>
                <div className="pt-2 pb-3">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="btn-primary w-full">
                      Launch Dashboard
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block py-2 px-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="pt-2 pb-3">
                  <Button className="btn-primary w-full">Subscribe</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
