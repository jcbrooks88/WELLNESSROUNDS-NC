import { useUserProfile } from "../../../hooks/useProfile.js";
import WorkHistoryItem from "./WorkHistoryItem";
import ProfileComment from "./ProfileComment";
import "./styles.css";

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
    <div className="user-profile">
      <div className="flex flex-col items-center">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt="User Avatar"
          className="user-avatar"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAvatarUpload}
          accept="image/*"
        />

        <h1 className="user-name">{user.username}</h1>

        {/* About Me */}
        <div className="w-full mt-4">
          <h2 className="section-title">About Me</h2>
          {isEditing ? (
            <div className="about-me-edit">
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
              <div className="about-me-buttons">
                <button className="btn-primary" onClick={handleAboutMeSave}>Save</button>
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <p
              className="about-me-text"
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
          <h2 className="section-title">Work History</h2>
          {user.workHistory && user.workHistory.length > 0 ? (
            <ul className="work-history-list">
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
        <div className="comment-section">
          <h2 className="section-title">Comments</h2>
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

          <div className="comment-input-container">
            <input
              type="text"
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
