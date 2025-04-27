import React from "react";
import { ThumbsUp, ThumbsDown, Bot, User } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isBot = message.role === "bot";
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render file attachments
  const renderAttachment = () => {
    if (!message.attachment) return null;
    
    if (message.attachment.type === 'image') {
      return (
        <div className="mt-2 rounded-md overflow-hidden">
          <img 
            src={message.attachment.url} 
            alt="Uploaded image" 
            className="max-h-60 w-full object-contain bg-black/20 rounded-md"
          />
        </div>
      );
    }
    
    if (message.attachment.type === 'audio') {
      return (
        <div className="mt-2 rounded-md overflow-hidden bg-black/10 p-1">
          <audio 
            controls 
            src={message.attachment.url} 
            className="w-full h-10"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    
    return null;
  };

  // Render sentiment analysis indicators
  const renderSentimentIndicator = () => {
    if (!message.analysis) return null;
    
    const { result, confidence } = message.analysis;
    const bgColor = result === 'positive' ? 'bg-teal-900/30' : 
                    result === 'negative' ? 'bg-red-900/30' : 'bg-gray-900/30';
    const textColor = result === 'positive' ? 'text-teal-300' : 
                    result === 'negative' ? 'text-red-300' : 'text-gray-300';
                    
    return (
      <div className={`mt-2 p-1.5 rounded-md ${bgColor} flex items-center text-xs`}>
        <div className={`${textColor} mr-2`}>
          {result === 'positive' ? (
            <ThumbsUp className="h-3 w-3" />
          ) : result === 'negative' ? (
            <ThumbsDown className="h-3 w-3" />
          ) : (
            <span>•</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className={`font-medium ${textColor}`}>
              {result.charAt(0).toUpperCase() + result.slice(1)} Sentiment
            </span>
            <span className="text-gray-400">{confidence}% confidence</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div 
              className={`h-1 rounded-full ${
                result === 'positive' ? 'bg-teal-400' : 
                result === 'negative' ? 'bg-red-400' : 'bg-gray-400'
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`mb-1.5 ${isBot ? '' : 'flex justify-end'}`}>
      <div
        className={`p-3 max-w-[85%] rounded-xl ${
          isBot 
            ? 'bg-monad/20 text-white border border-white/5' 
            : 'bg-groq/50 border border-blue-800/30'
        }`}
      >
        <div className="flex items-start gap-2">
          {isBot && (
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5 text-blue-300" />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center text-sm mb-1 gap-2">
              <span className="font-medium">
                {isBot ? "TruthStream" : "You"}
              </span>
              <span className="text-gray-400">{formatTime(message.timestamp)}</span>
            </div>
            <div className="text-sm">
              {message.content}
              {renderAttachment()}
              {renderSentimentIndicator()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
