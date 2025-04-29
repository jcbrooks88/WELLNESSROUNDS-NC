import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlRequest } from "../../../api/graphqlRequest";
import { SEARCH_DISCUSSIONS_QUERY } from "../../../graphql/discussion/queries.js";
import { useAuth } from "../../../context/AuthContext"; // 👈 import useAuth
import "../../../styles/App.css";
import "./styles.css";

const keywordOptions = [
  "Mental Health", "Burnout", "Career Change", "Self-Care", "Therapy",
  "Wellness", "Support", "Fitness", "Nutrition", "Work-Life Balance"
];

interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

interface SearchBarProps {
  onResults?: (results: Discussion[]) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);
  const [results, setResults] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth(); // 👈 use token from context

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        onResults?.([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const matchedKeywords = keywordOptions.filter((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        );

        const data = await graphqlRequest(
          SEARCH_DISCUSSIONS_QUERY,
          {
            title: query,
            keywords: matchedKeywords,
          },
          undefined,
          {
            Authorization: token ? `Bearer ${token}` : "",
          }
        );

        const fetched = data.searchDiscussions || [];
        setResults(fetched);
        onResults?.(fetched);
      } catch (err) {
        console.error("Search error:", err);
        setError("Error fetching search results.");
        onResults?.([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, token]); // 👈 include token as a dependency

  const highlightMatch = (text: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <mark key={i}>{part}</mark> : part
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredKeywords(
      value
        ? keywordOptions.filter((k) =>
            k.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setFilteredKeywords([]);
  };

  const handleResultClick = (discussionId: string) => {
    navigate(`/discussions/${discussionId}`);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by keyword or title..."
        value={query}
        onChange={handleInputChange}
      />

      {filteredKeywords.length > 0 && (
        <ul className="keyword-list">
          {filteredKeywords.map((keyword) => (
            <li
              key={keyword}
              className="keyword-pill"
              onClick={() => handleKeywordClick(keyword)}
            >
              {highlightMatch(keyword)}
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="search-loading">Loading...</p>}
      {error && <p className="search-error">{error}</p>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map((discussion) => (
            <div
              key={discussion._id}
              className="search-result-card"
              onClick={() => handleResultClick(discussion._id)}
            >
              <h3>{highlightMatch(discussion.title)}</h3>
              <p className="search-author">
                By {discussion.author?.username || "Anonymous"}
              </p>
              <p>{highlightMatch(discussion.content.slice(0, 60))}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
