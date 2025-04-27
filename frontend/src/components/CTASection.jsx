import React from "react";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="glass-card glow-border rounded-2xl p-12 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-fluvio/5 to-monad/5 z-0"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Start Exploring{" "}
            <span className="gradient-text">Emotional Intelligence</span> in
            News Today
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            Join the pioneers leveraging sentiment analysis and blockchain
            verification for news integrity. The future of media consumption is
            transparent, insightful, and emotionally aware.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                className="bg-gradient-to-r from-fluvio to-monad text-white text-lg py-7 px-16 rounded-xl flex items-center gap-2 
             transition-transform duration-250 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
              >
                Launch Dashboard
                <CircleArrowRight className="w-12 h-12" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
