import './styles.css';


type ProfileCommentProps = {
  comment: {
    _id: string;
    text: string;
    author: {
      username: string;
    };
  };
};

const ProfileComment = ({ comment }: ProfileCommentProps) => {
  return (
    <div className="comment">
      <p className="comment-author">{comment.author.username}:</p>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
};

export default ProfileComment;
