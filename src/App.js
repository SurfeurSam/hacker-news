import { useState } from 'react';
import NewsItem from './NewsItem/NewsItem'
import { useEffect } from 'react';
import { get } from './api/api';

function App() {
  
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsList();
  }, [])

  async function getNewsList() {
    const newsIds = await get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&&orderBy="$priority"&limitToFirst=10');
    const newsList = await Promise.all(newsIds.map((id) => get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)));
    setNews(newsList);
  };

  return (
    <div>
      <div>Колличество новостей: {news.length}</div>
      {
        news.map(item => {
          return <NewsItem 
                      key={item.id}
                      title={item.title} 
                      url={item.url}
                      date={item.time}
                      username={item.by}
                      score={item.score}
                      />
        })
      }
    </div>
  );
}

export default App;
