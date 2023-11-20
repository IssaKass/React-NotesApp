import React from "react";

function Editor({ notes, currentNote, updateNote }) {
  return (
    <div className="editor">
      {notes.length > 0 && (
        <div>
          <p className="creation-date">
            Created:&nbsp;
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(currentNote.createdAt)}
          </p>
          <textarea
            className="editor-area"
            value={currentNote?.body}
            onChange={(event) => updateNote(event.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default Editor;
