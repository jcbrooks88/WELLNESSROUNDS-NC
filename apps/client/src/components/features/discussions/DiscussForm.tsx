import React, { useState } from "react";
import { useCreateDiscussion } from "../../../hooks/useDiscussions.js";
import "./styles.css";

const keywordOptions = [
  "Mental Health", "Burnout", "Career Change", "Self-Care",
  "Therapy", "Wellness", "Support", "Fitness", "Nutrition", "Work-Life Balance"
];

interface DiscussionFormProps {
  onDiscussionCreated?: (newDiscussion: any) => void;
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({ onDiscussionCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const [createDiscussion, { loading, error }] = useCreateDiscussion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const keywordArray = [
      ...selectedKeywords,
      ...keywords.split(",").map(k => k.trim()).filter(Boolean)
    ];

    try {
      const newDiscussion = await createDiscussion({
        variables: { title, content, keywords: keywordArray }
      });

      if (newDiscussion) {
        onDiscussionCreated?.(newDiscussion); // ✅ Pass new discussion to parent
        setTitle(""); setContent(""); setKeywords(""); setSelectedKeywords([]);
      }
    } catch (err) {
      console.error("❌ Failed to post discussion", err);
    }
  };

  return (
    <div className="discussions-form-container">
    <form onSubmit={handleSubmit} className="discussions-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="discussions-input"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="discussions-textarea"
      />

      <section className="keyword-container">
        <p>Select Keywords:</p>
        {keywordOptions.map((keyword) => (
          <label key={keyword} className="keyword-label">
            <input
              type="checkbox"
              checked={selectedKeywords.includes(keyword)}
              onChange={() => {
                setSelectedKeywords((prev) =>
                  prev.includes(keyword)
                    ? prev.filter(k => k !== keyword)
                    : [...prev, keyword]
                );
              }}
              className="keyword-checkbox"
            />
            {keyword}
          </label>
        ))}

      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Add custom keywords (comma-separated)"
        className="keyword-input"
      />
  </section>

      <button type="submit" disabled={loading} className="discussions-button">
        {loading ? "Posting..." : "Post Discussion"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  </div>
  );
};

export default DiscussionForm;
