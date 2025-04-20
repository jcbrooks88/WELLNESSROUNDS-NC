import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DISCUSSION_BY_ID } from "../../../graphql/query";

export default function SearchResult() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_DISCUSSION_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const discussion = data?.getDiscussion;

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error.message}</p>;
  if (!discussion) return <p style={{ padding: "2rem" }}>Discussion not found.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem" }}>{discussion.title}</h2>
      <p style={{ color: "#555" }}>
        <strong>By:</strong> {discussion.author.username} &nbsp;|&nbsp;
        <em>{new Date(discussion.createdAt).toLocaleString()}</em>
      </p>
      <hr style={{ margin: "1rem 0" }} />
      <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        {discussion.content}
      </div>
    </div>
  );
}
