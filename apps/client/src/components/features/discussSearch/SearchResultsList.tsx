import React from "react";
import DiscussionCard from "../discussions/DiscussCard"; // Adjust the path if needed

interface SearchResultsProps {
  results: any[];
}

const SearchResultsList: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <p style={{ padding: "0rem", fontSize: "5rem", margin: "1%" }}>🔍</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Results</h2>
      {results.map((discussion) => (
        <DiscussionCard key={discussion._id} {...discussion} />
      ))}
    </div>
  );
};

export default SearchResultsList;
