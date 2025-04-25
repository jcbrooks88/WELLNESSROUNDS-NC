import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

interface DiscussionCardProps {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  author: {
    username: string;
  };
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  _id,
  title,
  content,
  keywords = [],
  author,
}) => {
  return (
    <Link to={`/discussions/${_id}`} className="discussion-card-link">
      <article className="discussion-card">
        <h2>{title || "Untitled Discussion"}</h2>
        <p>{content ? `${content.substring(0, 100)}...` : "No content available."}</p>
        <p>
        <strong>Keywords:</strong> {keywords?.length ? keywords.join(", ") : "None"}
        </p>
        <p>
          <strong>Posted by:</strong> {author?.username || "Anonymous"}
        </p>
      </article>
    </Link>
  );
};

export default DiscussionCard;
