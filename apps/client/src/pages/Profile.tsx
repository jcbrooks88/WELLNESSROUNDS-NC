import UserProfile from "../components/features/profile/UserProfile.js";

const ProfilePage = () => {
    return (
    <>
    <div className="pages-container">
      <div className="login-page-container">
        <UserProfile />
      </div>
      <div className="timeline-page">
      <h2>My Timeline</h2>
     </div>
   </div>
    </>
  );
  };
  
  export default ProfilePage;
  