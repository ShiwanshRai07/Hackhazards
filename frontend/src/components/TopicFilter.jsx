
import React from 'react';
import { Filter, TrendingUp, Briefcase, Cpu, Heart } from 'lucide-react';

const topics = [
  { id: 'all', label: 'All Topics', icon: Filter },
  { id: 'ai', label: 'AI', icon: Cpu },
  { id: 'politics', label: 'Politics', icon: TrendingUp },
  { id: 'finance', label: 'Finance', icon: Briefcase },
  { id: 'health', label: 'Health', icon: Heart },
];

const TopicFilter = ({ selectedTopic, onTopicChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
      {topics.map((topic) => {
        const Icon = topic.icon;
        const isActive = selectedTopic === topic.id;
        
        return (
          <button
            key={topic.id}
            onClick={() => onTopicChange(topic.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all whitespace-nowrap ${
              isActive 
                ? 'bg-gradient-to-r from-fluvio to-monad text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <Icon size={16} />
            <span>{topic.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TopicFilter;