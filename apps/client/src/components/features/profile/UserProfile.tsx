import { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PROFILE, UPDATE_ABOUT_ME, UPLOAD_AVATAR, ADD_PROFILE_COMMENT } from "../graphql/queries";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { loading, error, data } = useQuery(GET_USER_PROFILE, { variables: { username } });
  
  const [aboutMe, setAboutMe] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateAboutMe] = useMutation(UPDATE_ABOUT_ME);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR);
  const [addProfileComment] = useMutation(ADD_PROFILE_COMMENT);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  const { user } = data;

  const handleAboutMeSave = async () => {
    try {
      await updateAboutMe({ variables: { aboutMe } });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    try {
      await uploadAvatar({ variables: { file } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await addProfileComment({ variables: { username, text: commentText } });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover mb-4"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAvatarUpload}
          accept="image/*"
        />

        <h1 className="text-2xl font-bold mb-2">{user.username}</h1>

        <div className="w-full mt-4">
          <h2 className="text-xl font-semibold">About Me</h2>
          {isEditing ? (
            <div className="mt-2">
              <textarea
                className="w-full p-2 border rounded"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button className="btn-primary" onClick={handleAboutMeSave}>Save</button>
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <p className="mt-2 cursor-pointer" onClick={() => {
              setAboutMe(user.aboutMe || "");
              setIsEditing(true);
            }}>
              {user.aboutMe || "Click to add About Me"}
            </p>
          )}
        </div>

        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold">Work History</h2>
          <ul className="list-disc list-inside mt-2">
            {user.workHistory?.map((job: string, index: number) => (
              <li key={index}>{job}</li>
            )) || <p>No work history listed.</p>}
          </ul>
        </div>

        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2">
            {user.profileComments.map((comment: any) => (
              <div key={comment.id} className="border p-2 mb-2 rounded">
                <p className="text-sm text-gray-600">{comment.author.username}:</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Leave a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn-primary" onClick={handleAddComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
