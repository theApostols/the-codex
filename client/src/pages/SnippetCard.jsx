// // SnippetCard.js
// import React, { useState } from 'react';
// import CommentSection from './CommentSection';
// import Rating from './Rating';

const SnippetCard = ({ snippet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState(snippet);

  const handleEdit = () => {
    // Logic to handle editing the snippet
    // You may want to show a form for editing here
    setIsEditing(true);
  };

  const handleSave = () => {
    // Logic to save the edited snippet
   
    // and then set isEditing to false
    setIsEditing(false);
  };

  return (
    <div>
      <h3>{editedSnippet.title}</h3>
      {isEditing ? (
        // Show an editing form
        <textarea
          value={editedSnippet.code}
          onChange={(e) => setEditedSnippet({ ...editedSnippet, code: e.target.value })}
        />
      ) : (
        // Display the snippet
        <pre>{editedSnippet.code}</pre>
      )}

      <Rating snippetId={snippet.id} rating={snippet.rating} />
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <button onClick={handleSave}>Save</button>}

      <CommentSection snippetId={snippet.id} />
    </div>
  );
};

export default SnippetCard;