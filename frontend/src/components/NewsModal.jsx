
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Calendar, Clock, Lock, FileJson, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const NewsModal = ({ news, onClose }) => {
  if (!news) return null;
  
  const formattedDate = format(new Date(news.timestamp), 'PPP p');
  
  // Simulate a news article with emotional words highlighted
  const sampleArticleText = `The recent ${highlightWord('breakthrough')} in artificial intelligence research has led to ${highlightWord('surprising')} developments in the field. Researchers at OpenAI have ${highlightWord('discovered')} new capabilities that were previously thought to be years away. This ${highlightWord('remarkable')} progress has ${highlightWord('excited')} the scientific community, though some experts remain ${highlightWord('cautious')} about potential implications. The ${highlightWord('innovative')} approach combines neural networks with symbolic reasoning in ways that ${highlightWord('challenge')} conventional wisdom. Industry observers are ${highlightWord('optimistic')} about applications in healthcare, climate science, and education.`;
  
  function highlightWord(word) {
    // Determine emotional intensity (1-5)
    const intensity = Math.floor(Math.random() * 5) + 1;
    
    // Create color based on news sentiment and intensity
    let colorClass;
    if (news.sentiment.polarity === 'positive') {
      colorClass = `text-green-${intensity}00`;
    } else if (news.sentiment.polarity === 'negative') {
      colorClass = `text-red-${intensity}00`;
    } else {
      colorClass = `text-amber-${intensity}00`;
    }
    
    return `<span class="font-medium ${colorClass}">${word}</span>`;
  }
  
  return (
    <Dialog open={!!news} onOpenChange={onClose}>
      <DialogContent className="glass-card border-fluvio max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{news.headline}</DialogTitle>
          <div className="flex items-center text-sm text-gray-400 mt-2">
            <div className="flex items-center mr-4">
              <Calendar size={14} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            <span className="font-medium text-white/80">{news.source}</span>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center text-fluvio">
              <span>Article Content</span>
              <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-fluvio/20 text-fluvio">
                with sentiment analysis
              </div>
            </h3>
            <div 
              className="glass-card p-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sampleArticleText }}
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center text-groq">
              <Lock size={16} className="mr-1" />
              <span>Verifiable Metadata</span>
            </h3>
            <div className="glass-card p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">SHA-256 Hash</div>
                  <div className="font-mono text-xs bg-white/5 p-2 rounded overflow-x-auto">
                    {news.hash}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Timestamp</div>
                  <div className="font-mono text-sm bg-white/5 p-2 rounded">
                    {new Date(news.timestamp).toISOString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Signed by</div>
                  <div className="font-mono text-sm bg-white/5 p-2 rounded">
                    Groq NLP Agent v1.2
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Stored on</div>
                  <div className="font-mono text-sm bg-white/5 p-2 rounded">
                    Monad Chain #412420
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end mt-4">
            <Button className="flex items-center gap-1" variant="outline">
              <FileJson size={16} />
              <span>Export JSON</span>
            </Button>
            <Button className="flex items-center gap-1" variant="outline">
              <Share2 size={16} />
              <span>Share</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-fluvio to-monad text-white"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;