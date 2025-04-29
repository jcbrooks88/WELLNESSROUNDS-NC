import './styles.css';


type ProfileCommentProps = {
  comment: {
    _id: string;
    text: string;
    author: {
      username: string;
    };
    [x: string]: string | number | { username: string };
  };
};

const ProfileComment = ({ comment }: ProfileCommentProps) => {
  return (
    <>
      {comment.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No comments yet</p>
          <p className="text-sm">Be the first to start a conversation!</p>
        </div>
      ) : (
        <ul className="space-y-6">
          <div className="comment">
            <p className="comment-author">{comment.author.username}:</p>
            <p className="comment-text">{comment.text}</p>
          </div>
        </ul>
      )}
    </>
  );
};

export default ProfileComment;
