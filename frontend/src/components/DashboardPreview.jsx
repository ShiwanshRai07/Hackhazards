import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Twitter, Newspaper, Radio, Filter, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DashboardPreview = () => {
  // Sample news data with sentiment
  const newsFeed = [
    { 
      source: 'Twitter', 
      headline: "Breaking: Major economic policy reform announced", 
      sentiment: "positive",
      time: "2 min ago",
      icon: <Twitter size={16} className="text-fluvio" />
    },
    { 
      source: 'Reuters', 
      headline: "Tech stocks tumble amid regulatory concerns", 
      sentiment: "negative",
      time: "5 min ago",
      icon: <Newspaper size={16} className="text-white" />
    },
    { 
      source: 'NPR', 
      headline: "Scientists report breakthrough in renewable energy storage", 
      sentiment: "positive",
      time: "12 min ago",
      icon: <Radio size={16} className="text-groq" />
    },
    { 
      source: 'BBC', 
      headline: "International talks continue as deadline approaches", 
      sentiment: "neutral",
      time: "20 min ago",
      icon: <Newspaper size={16} className="text-white" />
    },
    { 
      source: 'Twitter', 
      headline: "Public reaction mixed to new healthcare initiative", 
      sentiment: "neutral",
      time: "23 min ago",
      icon: <Twitter size={16} className="text-fluvio" />
    },
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

  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return "bg-bright-teal/10 border-bright-teal/30";
      case 'negative':
        return "bg-red-400/10 border-red-400/30";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  return (
    <div id="how-it-works" className="section relative bg-navy/50 animate-on-scroll">
      <div className="tech-blob bg-groq/30 left-1/4 bottom-1/4 animate-pulse-slow blur-[80px]"></div>
      
      <div className="text-center mb-16">
        <h2 className="mb-4">
          See the <span className="gradient-text">Dashboard</span> in Action
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our intuitive interface provides real-time sentiment analysis on breaking news from multiple sources.
        </p>
      </div>
      
      <div className="glass-card p-6 md:p-8 max-w-5xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fluvio/30 rounded-full filter blur-[80px] -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-monad/30 rounded-full filter blur-[80px] -ml-32 -mb-32 opacity-50"></div>
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h3 className="text-2xl font-bold gradient-text">TruthStream Dashboard</h3>
            <p className="text-sm text-gray-400">Live sentiment analysis • Last updated: Just now</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20 flex items-center">
              <span className="w-2 h-2 rounded-full bg-bright-teal animate-pulse mr-2"></span> Live
            </div>
            <div className="bg-monad/10 px-3 py-1 rounded-full text-xs text-monad border border-monad/20 flex items-center">
              <Shield size={12} className="mr-1" /> Verified
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - News Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-medium">Live News Feed</h4>
                <Button variant="ghost" size="sm" className="flex items-center text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300">
                  <Filter size={12} className="mr-1.5" /> Filter
                </Button>
              </div>
              
              <div className="space-y-3">
                {newsFeed.map((item, index) => (
                  <div key={index} className={`rounded-lg p-3.5 flex items-start  transition-colors border ${getSentimentClass(item.sentiment)}`}>
                    {getSentimentIcon(item.sentiment)}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.icon}
                        <span className="text-xs text-gray-400">{item.source}</span>
                        <span className="text-xs text-gray-500">• {item.time}</span>
                      </div>
                      <p className="text-sm">{item.headline}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-gray-400 hover:text-white border border-white/10">
                  View more <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Stats */}
          <div>
            <div className="bg-white/5 rounded-lg p-5 mb-6 border border-white/10">
              <h4 className="font-medium mb-4">Sentiment Overview</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Positive</span>
                    <span className="text-xs text-bright-teal">42%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-bright-teal/70 to-bright-teal rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Neutral</span>
                    <span className="text-xs text-gray-300">35%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gray-400/70 to-gray-400 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Negative</span>
                    <span className="text-xs text-red-400">23%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-400/70 to-red-400 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-medium mb-4">Top Topics</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-fluvio/20 rounded-full text-xs border border-fluvio/30">Economy</div>
                <div className="px-3 py-1.5 bg-groq/20 rounded-full text-xs border border-groq/30">Technology</div>
                <div className="px-3 py-1.5 bg-monad/20 rounded-full text-xs border border-monad/30">Politics</div>
                <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs border border-white/20">Healthcare</div>
                <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs border border-white/20">Environment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Shield component
const Shield = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

export default DashboardPreview;
