import { Link, useParams } from "react-router-dom";
import { NewsItem } from "../../Components/NewsItem/NewsItem";
import { get } from "../../api/api";
import { useCallback, useEffect, useState } from "react";
import { CommentsWrapper } from "../../Components/Comments/CommentsWrapper";

export function CommentsPage() {
  const { id } = useParams();
  const [news, setNews] = useState();
  const [comments, setComments] = useState([]);


  const getNewsComments = useCallback(async (commentsIds) => {
    return await Promise.all(
      commentsIds.map(async (id) => {
        const comment = await get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );

        return comment;
      })
    );
  }, []);

  const getNewsData = useCallback(async () => {
    const newsData = await get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    setNews(newsData);
    if (newsData?.kids) {
      const commentsData = await getNewsComments(newsData.kids);
      setComments(commentsData);
    }
  }, [id, getNewsComments]);

  useEffect(() => {
    getNewsData();
  }, [getNewsData]);

  return (
    <div>
      <Link to="/">Назад</Link>
      {news && (
        <NewsItem
          title={news.title}
          username={news.by}
          date={news.time}
          url={news.url}
        />
      )}
      {comments && <CommentsWrapper comments={comments} />}
    </div>
  );
}
