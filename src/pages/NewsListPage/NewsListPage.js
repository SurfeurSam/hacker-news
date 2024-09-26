import { useState, useEffect } from "react";
import { NewsItem } from "../../Components/NewsItem/NewsItem";
import { get } from "../../api/api";
import styles from './NewsListPage.module.css'

function NewsListPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsList();
  }, []);

  async function getNewsList() {
    const newsIds = await get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&&orderBy="$priority"&limitToFirst=10'
    );
    const newsList = await Promise.all(
      newsIds.map((id) =>
        get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      )
    );
    setNews(newsList);
  }

  return (
    <div>
      <div>Колличество новостей: {news.length}</div>
      {news.map((item) => {
        return (
          <NewsItem
            className={styles.newsItem}
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.time}
            username={item.by}
            score={item.score}
          />
        );
      })}
    </div>
  );
}

export default NewsListPage;
