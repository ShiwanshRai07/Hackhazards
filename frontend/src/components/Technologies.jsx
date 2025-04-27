
import React, { useState } from 'react';
import { Zap, Database, Link2 } from 'lucide-react';
import { Tab } from '@headlessui/react';

const Technologies = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const technologies = [
    {
      name: "Fluvio",
      icon: <Zap className="text-fluvio" size={36} />,
      description: "Real-time data ingestion and stream processing that connects to RSS feeds, NewsAPI, Twitter, and more to provide a constant flow of fresh information.",
      features: [
        "High-throughput data streaming",
        "Multi-source connection",
        "Real-time processing"
      ],
      color: "text-fluvio",
      bgColor: "bg-fluvio/10",
      borderColor: "border-fluvio/30",
      code: `// Fluvio Stream Processing
const newsStream = createTopic('breaking-news');
stream.produce(feedData);
stream.consume((data) => {
  analyzeWithGroq(data);
});`
    },
    {
      name: "Groq",
      icon: <Database className="text-groq" size={36} />,
      description: "High-speed sentiment analysis that processes text and audio in milliseconds, extracting polarity, emotion, and detecting potential bias.",
      features: [
        "Lightning-fast LLM inference",
        "Multi-modal analysis",
        "Advanced sentiment extraction"
      ],
      color: "text-groq",
      bgColor: "bg-groq/10",
      borderColor: "border-groq/30",
      code: `// Groq Sentiment Analysis
const sentiment = await groq.analyze({
  text: newsItem.headline,
  models: ['sentiment', 'emotion'],
  options: { detectBias: true }
});`
    },
    {
      name: "Monad",
      icon: <Link2 className="text-monad" size={36} />,
      description: "Web3 integration that provides data integrity, transparency, and user trust through immutable blockchain records of important news analyses.",
      features: [
        "Immutable records",
        "Proof-of-origin",
        "Tamper-proof history"
      ],
      color: "text-monad",
      bgColor: "bg-monad/10",
      borderColor: "border-monad/30",
      code: `// Monad Blockchain Storage
await monad.storeNewsRecord({
  headline: news.headline,
  source: news.source,
  timestamp: Date.now(),
  sentiment: sentiment.score,
  hash: generateProof(news)
});`
    }
  ];

  return (
    <div id="technology" className="section relative animate-on-scroll">
      <div className="tech-blob bg-monad/30 right-1/4 top-1/2 animate-pulse-slow blur-[80px]"></div>
      
      <div className="text-center mb-16">
        <h2 className="mb-4">
          Powered by <span className="gradient-text">Modern Technology</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We combine the best tools to create a seamless experience from data ingestion to secure verification.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-8 border border-white/10 max-w-md mx-auto">
            {technologies.map((tech) => (
              <Tab
                key={tech.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 focus:outline-none ${
                    selected
                      ? `${tech.bgColor} ${tech.color} shadow ${tech.borderColor} border`
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {tech.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {technologies.map((tech, idx) => (
              <Tab.Panel
                key={idx}
                className={`rounded-xl p-6 glass-card border border-white/10 animate-fade-in`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl ${tech.bgColor} border ${tech.borderColor}`}>
                        {tech.icon}
                      </div>
                      <h3 className={`text-2xl ml-4 ${tech.color}`}>{tech.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      {tech.description}
                    </p>
                    <ul className="space-y-3">
                      {tech.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${tech.color.replace("text-", "bg-")} mr-2`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="code-block rounded-xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md">
                    <div className="flex items-center px-4 py-2 bg-black/40 border-b border-white/10">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 text-xs text-gray-400">{tech.name.toLowerCase()}.js</div>
                    </div>
                    <pre className={`p-4 text-sm ${tech.color}/80 overflow-x-auto`}>
                      {tech.code}
                    </pre>
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Technologies;
