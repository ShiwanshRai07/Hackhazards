import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SentimentTrendGraph from "./SentimentTrendGraph";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  FileDown,
  LogOut,
  User,
  BarChart3,
  Moon,
  Sun,
  Filter,
  Circle,
  LucideArrowDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import SentimentFeed from "@/components/SentimentFeed";
import SentimentOverview from "@/components/SentimentOverview";
import TopTopics from "@/components/TopTopics";

// Cache keys
const NEWS_CACHE_KEY = 'news_cache';
const CACHE_TIMESTAMP_KEY = 'news_cache_timestamp';
const CACHE_EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [liveMode, setLiveMode] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const isMobile = useIsMobile();
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  function simplifyTrendingNews(data) {
    return data.map(topic => {
      return {
        pubDate: topic.pubDate,
        trend: topic.trend,
        news: topic.news.length > 0 ? [topic.news[0]] : [],
        groqAnalysis: topic.groqAnalysis,
        publishedDate: topic.published_date
      };
    });
  }
  
  const isGoogleNewsArray = (data) => {
    return Array.isArray(data) && data.length && Array.isArray(data[0]?.news);
  };
  
  const formatTrendNewsItem = (newsItem, pubDate, groqAnalysis) => ({
    title: newsItem.title,
    source: newsItem.source || new URL(newsItem.url).hostname,
    time: new Date(pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    snippet: groqAnalysis?.summary || '',
    sentiment: groqAnalysis?.sentiment?.toLowerCase() || 'neutral',
    bias: groqAnalysis?.bias_level === 'Low' ? '10/100' : '30/100',
    emotion: groqAnalysis?.mood || 'Neutral',
    verified: true,
    newItem: true,
    newsUrl: newsItem.url,
  });
  
  const formatSingleNewsItem = (data) => ({
    title: data.title,
    source: new URL(data.newsUrl).hostname,
    time: new Date(data.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    snippet: data.groqAnalysis?.summary || data.description,
    sentiment: data.groqAnalysis?.sentiment?.toLowerCase() || 'neutral',
    bias: data.groqAnalysis?.bias_level === 'Low' ? '10/100' : '30/100',
    emotion: data.groqAnalysis?.mood || 'Neutral',
    verified: true,
    newItem: true,
    newsUrl: data.newsUrl,
  });

  // Load cached news on component mount
  useEffect(() => {
    const loadCachedNews = () => {
      try {
        const cachedNews = localStorage.getItem(NEWS_CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedNews && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          
          // Check if cache is still valid (less than CACHE_EXPIRY_TIME old)
          if (now - timestamp < CACHE_EXPIRY_TIME) {
            const parsedNews = JSON.parse(cachedNews);
            setNewsItems(parsedNews);
            console.log('Loaded news from cache:', parsedNews.length, 'items');
          } else {
            console.log('Cache expired, fetching fresh data');
          }
        } else {
          console.log('No cache found, fetching fresh data');
        }
      } catch (error) {
        console.error('Error loading cache:', error);
      }
      setIsLoading(false);
    };
    
    loadCachedNews();
  }, []);
  
  // Update cache whenever newsItems changes
  useEffect(() => {
    if (newsItems.length > 0) {
      try {
        localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(newsItems));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    }
  }, [newsItems]);

  // Connect to SSE for live updates
  useEffect(() => {
    if (!liveMode) return;
    
    const eventSource = new EventSource('http://localhost:8080/stream/news/breaking');

    eventSource.onmessage = (event) => {
      try {
        if (!event.data) {
          console.log("No Data");
          return;
        }
        
        const data = JSON.parse(event.data);
        
        // Case 1: Fully parsed Google-style array
        if (isGoogleNewsArray(data)) {
          const formatted = simplifyTrendingNews(data);
          setNewsItems((prevItems) => {
            // Avoid duplicates by checking if we already have this news item
            const newItems = formatted.filter(newItem => 
              !prevItems.some(existingItem => 
                existingItem.title === newItem.title
              )
            );
            return [...newItems, ...prevItems];
          });
        }
        // Case 2: Google Trends-like structure with `news` array inside
        else if (Array.isArray(data.news)) {
          const formatted = data.news.map((item) =>
            formatTrendNewsItem(item, data.pubDate, data.groqAnalysis)
          );
          setNewsItems((prevItems) => {
            const newItems = formatted.filter(newItem => 
              !prevItems.some(existingItem => 
                existingItem.title === newItem.title
              )
            );
            return [...newItems, ...prevItems];
          });
        }
        // Case 3: Single news object
        else {
          const formatted = formatSingleNewsItem(data);
          setNewsItems((prevItems) => {
            if (prevItems.some(item => item.title === formatted.title)) {
              return prevItems; // Skip duplicate
            }
            return [formatted, ...prevItems];
          });
        }
      } catch (err) {
        console.error('Invalid SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [liveMode]);

  // Clear cache function
  const clearCache = () => {
    localStorage.removeItem(NEWS_CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    setNewsItems([]);
    console.log('Cache cleared');
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="w-full max-w-screen-full mx-auto px-24">
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="text-xl font-bold flex items-center">
              <BarChart3 className="text-fluvio mr-2" />
              <span className="gradient-text mr-1">Emo</span>
              <span>Scope</span>
            </div>
            <div className="ml-6 flex space-x-1"></div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`h-8 px-3 flex items-center gap-1.5 rounded-full ${
                liveMode
                  ? "bg-monad/20 text-monad border-monad/30"
                  : "bg-white/5"
              } `}
              onClick={() => setLiveMode(!liveMode)}
            >
              <Circle
                className={`h-2 w-2 ${
                  liveMode ? "text-red-500 fill-red-500" : ""
                }`}
              />
              <span>Live</span>
            </Button>

            <Link to="/chat">
              <Button className="btn-primary w-full rounded-md">
                Chat Yourself
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4">
          <div className="flex mb-4 justify-between">
            <div className="flex space-x-2">
              {["All Topics"].map(
                (topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTopic(topic)}
                    className={`rounded border-white/10 ${
                      selectedTopic === topic
                        ? "bg-gradient-to-r from-fluvio to-monad text-white border-0"
                        : "bg-navy text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {topic}
                  </Button>
                )
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fluvio"></div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-150px)]">
              <div className="lg:w-3/5 flex flex-col">
                <ScrollArea className="h-full rounded-lg border border-white/10">
                  <SentimentFeed mockData={newsItems} />
                </ScrollArea>
              </div>
              <div className="lg:w-2/5 flex flex-col gap-4">
                <ScrollArea className="h-full rounded-lg border border-white/10">
                  <div className="bg-navy rounded-lg p-4">
                    <SentimentTrendGraph data={newsItems} />
                  </div>
                  <div className="bg-navy rounded-lg p-4 mt-4">
                    <SentimentOverview mockData={newsItems} />
                  </div>
                  <div className="bg-navy rounded-lg p-4 mt-4">
                    <TopTopics />
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;