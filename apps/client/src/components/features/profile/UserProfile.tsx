import { useState } from "react";
import { useUserProfile } from "../../../hooks/useProfile.js";
import { useUpdateUserProfile } from "../../../hooks/useUpdateProfile";
import WorkHistoryItem from "./WorkHistoryItem";
import ProfileComment from "./ProfileComment";
import EditableField from "./EditableField";
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

  const [updateUserProfile] = useUpdateUserProfile();
  const [, setProfile] = useState(user);

  const handleFieldSave = async (field: string, value: string): Promise<void> => {
    try {
      const { data } = await updateUserProfile({
        variables: { input: { [field]: value } },
      });
      if (data?.updateUserProfile) {
        setProfile(data.updateUserProfile);
      }
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="user-profile-layout">
      {/* Left Panel */}
      <div className="profile-info-panel">
        <div className="profile-banner" />
        <img
          src={user.avatarUrl || "/images/WRNC.png"}
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

        <EditableField
          label="Username"
          field="username"
          value={user.username}
          onSave={handleFieldSave}
        />
        <EditableField
          label="Location"
          field="location"
          value={typeof user.location === "string" ? user.location : ""}
          onSave={handleFieldSave}
        />
        <EditableField
          label="Role"
          field="role"
          value={typeof user.role === "string" ? user.role : ""}
          onSave={handleFieldSave}
        />

        {/* About Me Section */}
        <div className="mt-4">
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
        <div className="mt-6">
          <h2 className="section-title">Work History</h2>
          {user.workHistory?.length > 0 ? (
            <ul className="work-history-list">
              {user.workHistory.map((job, index) => (
                <WorkHistoryItem
                  key={job._id || index}
                  job={{
                    _id: job._id || index.toString(),
                    position: job.position || "Unknown",
                    company: job.company || "Unknown",
                    startDate: job.startDate?.toString() || "",
                    endDate: job.endDate?.toString(),
                    description: job.description || "No description provided",
                  }}
                />
              ))}
            </ul>
          ) : (
            <p>No work history listed.</p>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="comment-timeline-panel">
        <h2 className="section-title">Timeline</h2>
        <div className="comment-timeline">
          {user.profileComments.map((comment, index) => (
            <ProfileComment
              key={comment._id || index}
              comment={{
                _id: comment._id || index.toString(),
                text: comment.text || "No text provided",
                author: comment.author || { username: "Unknown Author" },
              }}
            />
          ))}
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
  );
};

export default UserProfile;
