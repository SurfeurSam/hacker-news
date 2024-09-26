import styles from "./CommentsWrapper.module.css";
import { unixToDate, copy } from "../../utils/utils";
import { useState } from "react";

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
  function expandComment(commentId) {
    const opened = copy(openedComments);

    if (opened[commentId]) {
      delete opened[commentId];
    } else {
      opened[commentId] = {};
    }

    onExpandComments(opened);
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
                onClick={(e) => expandComment(commentItem.id)}
              >
                Answers
              </button>
            )}
          </div>
          {commentItem?.kids?.length && openedComments[commentItem.id] && (
            <div className={styles.commentSubComment}>
              <Comments
                comments={commentItem.kids}
                openedComments={openedComments[commentItem.id]}
                onExpandComments={(subComments) => {
                    expandSubComments(commentItem.id, subComments)
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
