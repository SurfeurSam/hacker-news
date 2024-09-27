import styles from "./CommentsWrapper.module.css";
import { unixToDate, copy } from "../../utils/utils";
import { useState } from "react";
import { get } from "../../api/api";

export function CommentsWrapper({ comments }) {
  const [openedComments, setOpenedComments] = useState({});

  return (
    <div className={styles.container}>
      <Comments
        comments={comments}
        openedComments={openedComments}
        onExpandComments={setOpenedComments}
      />
    </div>
  );
}

function Comments({ comments, openedComments, onExpandComments }) {
  async function getSubComments(commentId, kidsId) {
    if(!openedComments[commentId]) {
      const subComments = await Promise.all(
        kidsId.map(async (id) => {
          return await get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          );
        })
      );
      const opened = copy(openedComments);
      opened[commentId] = subComments;
      onExpandComments(opened);
    } else {
      const opened = copy(openedComments);
      delete opened[commentId];
      onExpandComments(opened);
    }
  }

  function expandSubComments(commentId, subComments) {
    const opened = copy(openedComments);
    opened[commentId] = subComments;
    onExpandComments(opened);
  }

  return (
    <>
      {comments.map((commentItem) => (
        <div className={styles.commentContainer} key={commentItem.id}>
          <div className={styles.commentUserName}>{commentItem.by}</div>
          <div className={styles.commentText}>{commentItem.text}</div>
          <div className={styles.commentBottom}>
            <div className={styles.commentTime}>
              {unixToDate(commentItem.time)}
            </div>
            {commentItem?.kids?.length && (
              <button
                className={styles.commentButton}
                onClick={() => getSubComments(commentItem.id, commentItem.kids)}
              >
                Answers
              </button>
            )}
          </div>
          {openedComments[commentItem.id] && (
            <div className={styles.commentSubComment}>
              <Comments
                comments={openedComments[commentItem.id]}
                openedComments={openedComments[commentItem.id]}
                onExpandComments={(subComments) => {
                  expandSubComments(commentItem.id, subComments);
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
