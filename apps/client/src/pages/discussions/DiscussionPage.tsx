import { useState } from "react";
import Discussions from "../../components/features/discussions/Discussions";
import SearchBar from "../../components/features/discussSearch/SearchBar";
import SearchResultsList from "../../components/features/discussSearch/SearchResultsList";
import { useDiscussions } from "../../hooks/useDiscussions";
import "./styles.css";

export default function DiscussionPage() {
  const { discussions: allDiscussions, loading, error } = useDiscussions();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  if (loading) return <p>Loading discussions...</p>;
  if (error) return <p>Error loading discussions: {error.message}</p>;

  return (
    <div className="discussion-page">
      

      {!showModal && (
        <div className="search-again-container">
          <button className="safe-space-button" onClick={() => setShowModal(true)}>
            🔍 Search Discussions
          </button>
        </div>
      )}

      <h1>All Discussions</h1>
      <p>Click on a discussion to view more details.</p>

      <Discussions discussions={allDiscussions} />

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Search Discussions</h2>
            <SearchBar onResults={handleSearchResults} />
            {hasSearched && <SearchResultsList results={searchResults} />}
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
