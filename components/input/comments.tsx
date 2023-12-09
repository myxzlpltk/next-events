import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment, { CommentData } from "./new-comment";
import classes from "./comments.module.css";

type Props = {
  eventId: string;
  initialShowComments: boolean;
};

function Comments({ eventId, initialShowComments }: Props) {
  const [formError, setFormError] = useState<string>();
  const [showComments, setShowComments] = useState(initialShowComments);
  const [comments, setComments] = useState<CommentData[]>([]);

  function fetchData() {
    fetch("/api/comments/" + eventId)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      fetchData();
    }
  }, [showComments]);

  function addCommentHandler(commentData: CommentData) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(() => setFormError("Add comment failed!"))
      .then(() => fetchData());
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
