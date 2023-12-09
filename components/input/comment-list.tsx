import classes from "./comment-list.module.css";
import { CommentData } from "./new-comment";

type Props = {
  comments: CommentData[];
};

function CommentList({ comments }: Props) {
  return (
    <ul className={classes.comments}>
      {comments.map((comment, index) => (
        <li key={index}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
