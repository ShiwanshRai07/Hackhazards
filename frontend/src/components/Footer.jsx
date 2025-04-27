import React from "react";
import { Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-black/90"></div>
      <div className="bg-navy/30 border-t border-white/10 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
            <div className="md:col-span-3">
              <div className="text-3xl font-bold mb-6">
                <span className="gradient-text">Truth</span>
                <span className="text-white">Stream</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Real-time news sentiment analysis powered by Fluvio, Groq, and
                Monad. Experience transparency and trust in news like never
                before.
              </p>

              <div className="mb-8">
                <p className="text-gray-300 mb-3 text-sm">
                  Subscribe to our newsletter
                </p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 rounded-r-none"
                  />
                  <Button className="rounded-l-none bg-fluvio hover:bg-fluvio/90">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TruthStream. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
