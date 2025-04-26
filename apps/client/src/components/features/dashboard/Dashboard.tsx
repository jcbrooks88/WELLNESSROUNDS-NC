import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DiscussionForm from "..//discussions/DiscussForm.js";
import "./styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleNewDiscussion = (newDiscussion: any) => {
    console.log("✅ New Discussion Created:", newDiscussion);
    setShowForm(false);

    if (newDiscussion && newDiscussion._id) {
      navigate(`/discussions/${newDiscussion._id}`);
    } else {
      console.warn("New discussion did not return an ID.");
    }
  };

  const handleNavigateToDiscussion = () => {
    navigate("/discussions");
  };

  return (
    <div className="dashboard-container">
      <h1>What Space are you In?</h1>

      <div className="button-group">
        <button className="safe-space-button" onClick={() => setShowForm(true)}>
          Create a Safe Space
        </button>

        <button className="safe-space-button" onClick={handleNavigateToDiscussion}>
          Find a Safe Space
        </button>
      </div>

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Discussion</h2>
            <DiscussionForm onDiscussionCreated={handleNewDiscussion} />
            <button className="close-button" onClick={() => setShowForm(false)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
