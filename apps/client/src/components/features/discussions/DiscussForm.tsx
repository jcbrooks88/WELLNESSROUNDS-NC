import React, { useState } from "react";
import { useCreateDiscussion } from "../../hooks/useCreateDiscussion";

const keywordOptions = ["Mental Health", "Burnout", "Career Change", "Self-Care", "Therapy", "Wellness", "Support", "Fitness", "Nutrition", "Work-Life Balance"];

const DiscussionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const { createDiscussion, loading, error } = useCreateDiscussion();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    const keywordArray = [...selectedKeywords, ...keywords.split(",").map(k => k.trim())];

    try {
      await createDiscussion({ title, content, keywords: keywordArray });
      setTitle(""); setContent(""); setKeywords("");
      alert("Discussion posted!");
    } catch (err) {
      console.error("Failed to post discussion", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2>Create a Safe Space</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <div> 
        <p>Select Keywords:</p>
        {keywordOptions.map((keyword) => (
          <label key={keyword}>
            <input
              type="checkbox"
              checked={selectedKeywords.includes(keyword)}
              onChange={() => {
                if (selectedKeywords.includes(keyword)) {
                  setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
                } else {
                  setSelectedKeywords([...selectedKeywords, keyword]);
                }
              }}
            />
            {keyword}
          </label>
        ))}
      </div>
      
      <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma-separated)" />
      <button type="submit" disabled={loading}>Post Discussion</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default DiscussionForm;
