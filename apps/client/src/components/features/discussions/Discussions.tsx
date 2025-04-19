import React from "react";
import "./Discussions.css";

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
      {discussions.map(({ _id, title, content, keywords, author }) => (
        <article key={_id} className="discussion-card">
          <h2>{title || "Untitled Discussion"}</h2>
          <p>{content || "No content provided."}</p>
          <p><strong>Keywords:</strong> {keywords.join(", ") || "None"}</p>
          <p><strong>Posted by:</strong> {author?.username || "Anonymous"}</p>
        </article>
      ))}
    </section>
  );
};

export default Discussions;
