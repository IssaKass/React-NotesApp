import React from "react";
import { MdPushPin } from "react-icons/md";
import NoteTab from "./Notetab";

function Sidebar({ notes, currentNote, setCurrentNoteId }) {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div className="sidebar">
      {notes && notes.length > 0 ? (
        <>
          {notesPinned.length > 0 && (
            <div className="pinned-notes">
              <p className="pinned-notes-title">
                <MdPushPin /> Pinned
              </p>
              {notesPinned.map((note) => (
                <NoteTab
                  key={note.id}
                  note={note}
                  currentNote={currentNote}
                  setCurrentNoteId={setCurrentNoteId}
                />
              ))}
            </div>
          )}
          {notesUnpinned.length > 0 && (
            <div className="unpinned-notes">
              {notesUnpinned.map((note) => (
                <NoteTab
                  key={note.id}
                  note={note}
                  currentNote={currentNote}
                  setCurrentNoteId={setCurrentNoteId}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="no-notes">No Notes</p>
      )}
    </div>
  );
}

export default Sidebar;
