export function unixToDate(inixTime) {
  const date = new Date(inixTime * 1000);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();

  return `${dd}/${mm}/${yy}`;
}

export function domainToHostName(url) {
  const domain = new URL(url);
  return domain.hostname;
}

export function openExternalUrl(url) {
  window.open(url);
}

export function copy(entity) {
  return JSON.parse(JSON.stringify(entity));
}

// export const getNewsComments = async (commentsIds) => {
//   return await Promise.all(
//     commentsIds.map(async (id) => {
//       const comment = await get(
//         `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
//       );

//       if (comment?.kids) {
//         comment.kids = await getNewsComments(comment.kids);
//       }
//       return comment;
//     })
//   );
// };

// export const getNewsData = async (id) => {
//   const newsData = await get(
//     `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
//   );
//   setNews(newsData);
//   if (newsData?.kids) {
//     const commentsData = await getNewsComments(newsData.kids);
//     setComments(commentsData);
//   }
// };
