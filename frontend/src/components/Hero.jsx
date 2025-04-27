import React, { useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      const cards = containerRef.current.querySelectorAll('.hero-card');
      cards.forEach((card) => {
        const cardEl = card;
        const offset = cardEl.dataset.offset || '5';
        const offsetValue = parseInt(offset);
        
        const rotateX = (y - 0.5) * offsetValue;
        const rotateY = (x - 0.5) * offsetValue;
        
        cardEl.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Sample news data with sentiment
  const sampleNews = [
    { headline: "Global Markets Rally On Economic Growth", sentiment: "positive" },
    { headline: "Tech Giant Announces New AI Breakthrough", sentiment: "positive" },
    { headline: "Political Tensions Rise in Key Regions", sentiment: "negative" },
    { headline: "Central Bank Holds Interest Rates Steady", sentiment: "neutral" },
    { headline: "Climate Summit Reaches Historic Agreement", sentiment: "positive" },
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="sentiment-icon-positive" size={18} />;
      case 'negative':
        return <TrendingDown className="sentiment-icon-negative" size={18} />;
      default:
        return <AlertCircle className="sentiment-icon-neutral" size={18} />;
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen pt-16 flex items-center overflow-hidden">
      {/* Background blobs with enhanced effects */}
      <div className="tech-blob bg-fluvio left-0 top-[15%] animate-pulse-slow blur-[80px] opacity-30"></div>
      <div className="tech-blob bg-groq right-0 top-[40%] animate-pulse-slow blur-[80px] opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="tech-blob bg-monad left-0 bottom-[10%] animate-pulse-slow blur-[80px] opacity-30" style={{ animationDelay: '2s' }}></div>
      
      {/* Moving data lines - decorative background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="data-line" 
            style={{ 
              width: `${Math.random() * 30 + 40}%`, 
              background: i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#9B60DE' : '#00E5BE',
              animationDuration: `${Math.random() * 10 + 15}s`,
              marginLeft: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/10 text-sm border border-white/20">
              <span className="inline-block w-2 h-2 rounded-full bg-bright-teal mr-2"></span>
              Real-Time News Analytics
            </div>
            <h1 className="mb-6 leading-tight">
              <span className="gradient-text font-bold">Discover the Truth</span> Behind Every Headline
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience news in a new dimension with instant sentiment analysis powered by <span className="highlight-text-fluvio">Fluvio</span>, <span className="highlight-text-groq">Groq</span>, and <span className="highlight-text-monad">Monad</span> technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
              <Button className="btn-primary group">
                Get News
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Button>
              </Link>
              <Link to="/chat">
              <Button className="btn-secondary">
                Analyse by Yourself !
              </Button>
              </Link>
            </div>
          </div>
          
          <div className="hero-card glass-card p-6 transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,255,0.3)] animate-float" data-offset="5">
            <h3 className="text-xl mb-4 flex items-center">
              <span className="gradient-text">Live Sentiment</span>
              <span className="ml-2 px-2 py-1 rounded-full bg-white/10 text-xs border border-white/20">UPDATING LIVE</span>
            </h3>
            <div className="space-y-4">
              {sampleNews.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-start gap-3 transition-all duration-300 transform hover:translate-x-1 ${
                  item.sentiment === 'positive' ? 'bg-bright-teal/10 border border-bright-teal/20' : 
                  item.sentiment === 'negative' ? 'bg-red-400/10 border border-red-400/20' : 
                  'bg-white/5 border border-white/10'
                }`}>
                  <div className="mt-0.5">{getSentimentIcon(item.sentiment)}</div>
                  <p className="text-sm text-gray-100">{item.headline}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-gray-400">Verified by <span className="text-monad">Monad</span> blockchain</span>
              <span className="text-xs text-gray-400 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-groq animate-pulse mr-2"></span>
                Live updates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;