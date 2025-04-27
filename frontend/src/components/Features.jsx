
import React from 'react';
import { 
  Zap, 
  BarChart3, 
  Shield, 
  Rss, 
  Search, 
  TrendingUp, 
  Radio, 
  Link2 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "Real-Time News Streaming",
      description: "Instantly connect to RSS feeds, Twitter, and other news sources with Fluvio's streaming capabilities.",
      icon: <Rss className="text-fluvio" size={36} />,
      color: "border-fluvio",
      bgColor: "bg-fluvio/5"
    },
    {
      title: "Sentiment Analysis",
      description: "Analyze the polarity, emotion, and bias of text and audio content using Groq's high-speed models.",
      icon: <BarChart3 className="text-groq" size={36} />,
      color: "border-groq",
      bgColor: "bg-groq/5"
    },
    {
      title: "Blockchain Verification",
      description: "Store verified summaries and analysis on Monad for tamper-proof, transparent news insights.",
      icon: <Shield className="text-monad" size={36} />,
      color: "border-monad",
      bgColor: "bg-monad/5"
    },
    {
      title: "Lightning-Fast Processing",
      description: "Process news and sentiment in milliseconds, providing near-instantaneous insights.",
      icon: <Zap className="text-fluvio" size={36} />,
      color: "border-fluvio",
      bgColor: "bg-fluvio/5"
    },
    {
      title: "Advanced Filtering",
      description: "Filter by emotion, source, language, and region to focus on what matters to you.",
      icon: <Search className="text-groq" size={36} />,
      color: "border-groq",
      bgColor: "bg-groq/5"
    },
    {
      title: "Trend Detection",
      description: "Track sentiment trends over time to identify emerging stories and shifts in public opinion.",
      icon: <TrendingUp className="text-white" size={36} />,
      color: "border-white/20",
      bgColor: "bg-white/5"
    },
    {
      title: "Audio Analysis",
      description: "Convert audio news clips to text and analyze sentiment on spoken content as well.",
      icon: <Radio className="text-groq" size={36} />,
      color: "border-groq",
      bgColor: "bg-groq/5"
    },
    {
      title: "Web3 Integration",
      description: "Bridge Web2 speed with Web3 trust: immutable records provide permanent, verifiable news snapshots.",
      icon: <Link2 className="text-monad" size={36} />,
      color: "border-monad",
      bgColor: "bg-monad/5"
    },
  ];

  return (
    <div id="features" className="section relative animate-on-scroll">
      <div className="tech-blob bg-fluvio/30 right-1/4 top-1/4 animate-pulse-slow blur-[80px]"></div>
      
      <div className="text-center mb-16">
        <h2 className="mb-4">
          <span className="gradient-text">Powerful</span> Features
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          TruthStream combines cutting-edge technologies to deliver a news experience that's both lightning-fast and verifiably transparent.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className={`glass-card hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500  overflow-hidden group ${feature.bgColor}`}>
            <div className={`h-1 w-full ${feature.color.replace('border-', 'bg-')}`}></div>
            <CardContent className="pt-6">
              <div className="mb-4 p-3 rounded-xl bg-white/5 inline-block group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
