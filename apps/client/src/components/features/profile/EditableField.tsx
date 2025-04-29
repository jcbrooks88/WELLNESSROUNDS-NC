import React, { useState } from "react";

interface EditableFieldProps {
  label: string;
  field: string;
  value: string;
  onSave: (field: string, value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, field, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState("");

  const validate = (val: string) => {
    if (!val.trim()) return `${label} cannot be empty.`;
    if (val.length > 50) return `${label} is too long.`;
    return "";
  };

  const handleSave = () => {
    const validationError = validate(draft);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave(field, draft.trim());
    setEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
    setError("");
  };

  return (
<div className="editable-field">
  <label>{label}</label>
  {editing ? (
    <>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <div className="action-buttons">
        <button className="save" onClick={handleSave}>Save</button>
        <button className="cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </>
  ) : (
    <div className="display-container">
      <span>{value || "—"}</span>
      <button className="edit-btn" onClick={() => setEditing(true)}>
        ✏️ Edit
      </button>
    </div>
  )}
  {error && <p className="text-red-500 text-sm">{error}</p>}
</div>

  );
};

export default EditableField;
