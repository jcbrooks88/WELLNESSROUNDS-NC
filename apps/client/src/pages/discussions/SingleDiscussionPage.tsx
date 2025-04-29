import React from "react";
import { useParams } from "react-router-dom";
import { getDiscussionByID } from "../../hooks/useDiscussions.js";
import "./styles.css";

const SingleDiscussionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = getDiscussionByID(id || "");
  const discussion = data?.getDiscussionByID;

  if (loading) return <p>Loading discussion...</p>;
  if (error) return <p>Error loading discussion: {error.message}</p>;
  if (!discussion) return <p>Discussion not found.</p>;

  return (
    <article className="single-discussion">
      <h1>{discussion.title}</h1>
      <p>{discussion.content}</p>
      <p><strong>Keywords:</strong> {discussion.keywords.join(", ")}</p>
      <p><strong>Posted by:</strong> {discussion.author.username}</p>
    </article>
  );
};

export default SingleDiscussionPage;
