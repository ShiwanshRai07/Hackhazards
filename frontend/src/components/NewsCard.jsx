
import React from 'react';
import { Clock, ArrowRight, Lock, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Emoji mapping for sentiments
const emotionEmojis = {
  joy: '😄',
  surprise: '😲',
  fear: '😨',
  anger: '😡',
  sadness: '😢',
  disgust: '🤢',
  frustration: '😤',
  optimism: '🤩',
  neutral: '😐'
};

// Color mapping for polarities
const polarityColors = {
  positive: 'text-bright-teal',
  negative: 'text-red-400',
  neutral: 'text-gray-400'
};

const NewsCard = ({ news, onClick, isNew }) => {
  const { headline, timestamp, source, snippet, sentiment } = news;
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  return (
    <div 
      className={`glass-card group relative overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer ${
        isNew ? 'animate-fade-in border-l-4 border-fluvio' : ''
      }`}
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute -right-12 top-3 bg-fluvio text-white px-10 py-0.5 rotate-45 text-xs font-semibold">
          NEW
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 group-hover:text-fluvio transition-colors">
          {headline}
        </h3>
        
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <Clock size={14} className="mr-1" />
            <span>{timeAgo}</span>
          </div>
          <span className="font-medium text-white/80">{source}</span>
        </div>
        
        <div className="flex items-start mb-4">
          <MessageSquare size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
          <p className="text-gray-300">{snippet}</p>
        </div>
        
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center bg-white/5 px-3 py-1 rounded-full">
              <span className={`font-medium ${polarityColors[sentiment.polarity]}`}>
                {sentiment.polarity.charAt(0).toUpperCase() + sentiment.polarity.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center bg-white/5 px-3 py-1 rounded-full">
              <span className="mr-1">{emotionEmojis[sentiment.emotion] || '🔍'}</span>
              <span className="font-medium">
                {sentiment.emotion.charAt(0).toUpperCase() + sentiment.emotion.slice(1)}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center bg-white/5 px-3 py-1 rounded-full">
              <span className="font-medium">Bias: {sentiment.biasScore}/100</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-xs flex items-center mr-3 text-fluvio">
              <Lock size={12} className="mr-1" />
              <span>Verified</span>
            </div>
            
            <button className="btn-secondary py-1 px-3 flex items-center text-sm group-hover:bg-fluvio group-hover:border-fluvio transition-colors">
              <span>View Full</span>
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;