import React, { useState } from "react";
import { useCreateDiscussion } from "../../../graphql/hooks/useCreateDiscussion";

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

  const { createDiscussion, loading, error } = useCreateDiscussion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const keywordArray = [
      ...selectedKeywords,
      ...keywords.split(",").map(k => k.trim()).filter(Boolean)
    ];

    try {
      const newDiscussion = await createDiscussion({ title, content, keywords: keywordArray });

      if (newDiscussion) {
        onDiscussionCreated?.(newDiscussion); // ✅ Pass new discussion to parent
        setTitle(""); setContent(""); setKeywords(""); setSelectedKeywords([]);
      }
    } catch (err) {
      console.error("❌ Failed to post discussion", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Safe Space</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />

      <div>
        <p>Select Keywords:</p>
        {keywordOptions.map((keyword) => (
          <label key={keyword} style={{ display: "inline-block", marginRight: "1rem" }}>
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
            />
            {keyword}
          </label>
        ))}
      </div>

      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Add custom keywords (comma-separated)"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Discussion"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  );
};

export default DiscussionForm;
