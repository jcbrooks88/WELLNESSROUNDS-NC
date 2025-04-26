type ProfileCommentProps = {
    comment: {
      id?: string;
      text: string;
      author: {
        username: string;
      };
    };
  };
  
  const ProfileComment = ({ comment }: ProfileCommentProps) => {
    return (
      <div className="border p-2 mb-2 rounded">
        <p className="text-sm text-gray-600">{comment.author.username}:</p>
        <p>{comment.text}</p>
      </div>
    );
  };
  
  export default ProfileComment;
  