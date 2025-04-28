import React from "react";
import { useDiscussions } from "../../../hooks/useDiscussions.js";
import { Link } from "react-router-dom";
import "./styles.css";

interface Discussion {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  author?: {
    username: string;
  };
}

const DiscussionsPage: React.FC = () => {
  const { discussions, loading, error } = useDiscussions();

  if (loading) return <p>Loading discussions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    
    <section className="discussions-container">
      {discussions.map(({ _id, title, content, keywords, author }: Discussion) => (
        <Link to={`/discussions/${_id}`} key={_id} className="discussion-card-link">
          <article className="discussion-card">
            <h2>{title}</h2>
            <p>{content.substring(0, 100)}...</p>
            <p className="discussion-keywords"><strong>Keywords:</strong> {keywords.join(", ")}</p>
            <p className="discussion-author"><strong>Posted by:</strong> {author?.username || "Anonymous"}</p>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default DiscussionsPage;

// Forum-style Discussion List