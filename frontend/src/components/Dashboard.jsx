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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [liveMode, setLiveMode] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const isMobile = useIsMobile();
  const [newsItems, setNewsItems] = useState([]);
  
  function simplifyTrendingNews(data) {
    return data.map(topic => {
      return {
        pubDate : topic.pubDate,
        trend: topic.trend,
        news: topic.news.length > 0 ? [topic.news[0]] : [],
        groqAnalysis: topic.groqAnalysis,
        publishedDate : topic.published_date
      };
    });
  }
  const isGoogleNewsArray = (data) => {
      return Array.isArray(data) && data.length && Array.isArray(data[0]?.news);
    };
  
    // const formatGoogleNewsItem = (item) => ({
    //   title: item.title,
    //   source: new URL(item.newsUrl).hostname,
    //   time: new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //   snippet: item.groqAnalysis?.summary || item.description || '',
    //   sentiment: item.groqAnalysis?.sentiment?.toLowerCase() || 'neutral',
    //   bias: item.groqAnalysis?.bias_level === 'Low' ? '10/100' : '30/100',
    //   emotion: item.groqAnalysis?.mood || 'Neutral',
    //   verified: true,
    //   newItem: true,
    //   newsUrl: item.newsUrl,
    // });
  
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
  
  // Usage
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/stream/news/breaking');

    eventSource.onmessage = (event) => {
      try {
        if(!event.data){
          console.log("No Data");
        }
        const data = JSON.parse(event.data);
        //console.log(data);        

        // Case 1: Fully parsed Google-style array
        if (isGoogleNewsArray(data)) {
          const formatted = simplifyTrendingNews(data);
          setNewsItems((prevItems) => [...formatted, ...prevItems]);
        }
        // Case 2: Google Trends-like structure with `news` array inside
        else if (Array.isArray(data.news)) {
          const formatted = data.news.map((item) =>
            formatTrendNewsItem(item, data.pubDate, data.groqAnalysis)
          );
          setNewsItems((prevItems) => [...formatted, ...prevItems]);
        }
        // Case 3: Single news object
        else {
          const formatted = formatSingleNewsItem(data);
          setNewsItems((prevItems) => [formatted, ...prevItems]);
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
  }, [newsItems]);

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

            <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;