
import React from 'react';
import { Button } from '@/components/ui/button';

const TopTopics = () => {
  const topics = [
    { name: 'AI', active: true },
    { name: 'Economy', active: true },
    { name: 'Technology', active: true },
    { name: 'Politics', active: true },
    { name: 'Healthcare', active: false },
    { name: 'Environment', active: false }
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Top Topics</h2>
      
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant="outline"
            className={`rounded-full h-8 px-4 ${
              topic.active 
                ? 'bg-fluvio/20 text-fluvio border-fluvio/30' 
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            {topic.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopTopics;