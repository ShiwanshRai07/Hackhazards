
import React from 'react';
import { Activity, Archive } from 'lucide-react';

const ModeToggle = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex items-center bg-white/5 rounded-full p-1">
      <button
        onClick={() => onModeChange('live')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
          currentMode === 'live'
            ? 'bg-gradient-to-r from-fluvio to-monad text-white'
            : 'hover:bg-white/5 text-gray-300'
        }`}
      >
        <Activity size={16} className={currentMode === 'live' ? 'text-white' : 'text-red-500'} />
        <span>Live</span>
      </button>
      
      <button
        onClick={() => onModeChange('archive')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
          currentMode === 'archive'
            ? 'bg-gradient-to-r from-fluvio to-monad text-white'
            : 'hover:bg-white/5 text-gray-300'
        }`}
      >
        <Archive size={16} />
        <span>Archive</span>
      </button>
    </div>
  );
};

export default ModeToggle;