import { useUserProfile } from "../../../hooks/useProfile.js";
import WorkHistoryItem from "./WorkHistoryItem";
import ProfileComment from "./ProfileComment";

const UserProfile = () => {
  const {
    loading,
    error,
    user,
    aboutMe,
    setAboutMe,
    isEditing,
    setIsEditing,
    commentText,
    setCommentText,
    fileInputRef,
    handleAboutMeSave,
    handleAvatarUpload,
    handleAddComment,
  } = useUserProfile();

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;
  if (!user) return <div>No user data found.</div>;

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

        {/* About Me */}
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
            <p
              className="mt-2 cursor-pointer"
              onClick={() => {
                setAboutMe(user.aboutMe || "");
                setIsEditing(true);
              }}
            >
              {user.aboutMe || "Click to add About Me"}
            </p>
          )}
        </div>

        {/* Work History */}
        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold">Work History</h2>
          {user.workHistory && user.workHistory.length > 0 ? (
            <ul className="list-disc list-inside mt-2">
              {user.workHistory.map((job: { id?: string; [key: string]: any }, index: number) => {
                const mappedJob = {
                  id: job.id,
                  position: job.position || "Unknown Position",
                  company: job.company || "Unknown Company",
                  startDate: job.startDate || "Unknown Start Date",
                  endDate: job.endDate || undefined,
                  description: job.description || "No description provided",
                };
                return <WorkHistoryItem key={mappedJob.id || index} job={mappedJob} />;
              })}
            </ul>
          ) : (
            <p className="mt-2">No work history listed.</p>
          )}
        </div>

        {/* Comments */}
        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2">
            {user.profileComments.map((comment: { id?: string; [key: string]: any }, index: number) => {
              const mappedComment = {
                id: comment.id,
                text: comment.text || "No text provided",
                author: comment.author || { username: "Unknown Author" },
              };
              return <ProfileComment key={mappedComment.id || index} comment={mappedComment} />;
            })}
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
