import React from "react";

function NoteTab({ note, currentNote, setCurrentNoteId }) {
  return (
    <div
      className="note-tab"
      data-selected={currentNote && note.id === currentNote.id}
      key={note.id}
      onClick={() => setCurrentNoteId(note.id)}
    >
      <h3 className={`note-tab-title ${note.body === "" ? "untitled" : ""}`}>
        {note.body ? note.body.split("\n")[0] : "New Note"}
      </h3>
      <small className="editing-date">
        {new Intl.DateTimeFormat("en-US", {
          timeStyle: "short",
        }).format(note.editedAt)}
      </small>
    </div>
  );
}

export default NoteTab