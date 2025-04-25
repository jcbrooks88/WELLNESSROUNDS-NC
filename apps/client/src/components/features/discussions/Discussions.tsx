import React from "react";
import DiscussionCard from "./DiscussCard"; // adjust path as needed
import "./styles.css";

interface Discussion {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  author: {
    username: string;
  };
}

interface DiscussionsProps {
  discussions: Discussion[];
}

const Discussions: React.FC<DiscussionsProps> = ({ discussions }) => {
  if (discussions.length === 0) {
    return <p className="empty-state">No discussions yet. Be the first to start one!</p>;
  }

  return (
    <section className="discussions-container">
      {discussions.map((discussion) => (
        <DiscussionCard key={discussion._id} {...discussion} />
      ))}
    </section>
  );
};

export default Discussions;
