import { useState } from 'react';
import NewsItem from './NewsItem/NewsItem'
import { useEffect } from 'react';

const initNews = [
  {
    title: 'GFirst news',
    username: 'Fire',
    url: 'www.ex.com',
    date: '11.04.24',
    score: 40,
    id: '89898',
  },
  {
    title: 'Second news',
    username: 'Water',
    url: 'www.ex6.com',
    date: '14.06.24',
    score: 50,
    id: '345',
  },
  {
    title: 'Second news',
    username: 'Edge',
    url: 'www.ex2.com',
    date: '11.03.24',
    score: 20,
    id: '9854',
  }
];

const newNews = {
  title: 'Third news',
  username: 'Edge444',
  url: 'www.ex2.com',
  date: '11.03.24',
  score: 78,
  id: '232',
};

function App() {
  const checkStorage = () => JSON.parse(window.localStorage.getItem('newsKey')) || initNews;
  
  const [news, setNews] = useState(checkStorage);
  
  useEffect(() => {
    window.localStorage.setItem('newsKey', JSON.stringify(news))
  }, [news])

  const newCountHandler = () => {
    setNews((prev) => [...prev, {...newNews, id: Date.now()}]);
  }

  return (
    <div>
      <div>Колличество новостей: {news.length}</div>
      <button onClick={newCountHandler}>Add news</button>
      {
        news.map(item => {
          return <NewsItem 
                      key={item.id}
                      title={item.title} 
                      url={item.url}
                      date={item.date}
                      username={item.username}
                      score={item.score}
                      />
        })
      }
    </div>
  );
}

export default App;
