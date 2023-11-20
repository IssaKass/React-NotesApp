import React from "react";
import {
  FaRegTrashCan,
  FaRegPenToSquare,
  FaDownload,
  FaMapPin,
} from "react-icons/fa6";
import ThemeSwitcher from "./ThemeSwitcher";

function Toolbar({
  notes,
  currentNote,
  createNote,
  deleteNote,
  handlePinNote,
  downloadNote,
  searchForNotes,
  searchQuery,
}) {
  return (
    <div className="toolbar">
      <button
        className="toolbar-button"
        title="Create a note"
        onClick={createNote}
      >
        <FaRegPenToSquare />
      </button>
      <button
        className="toolbar-button"
        title="Delete"
        onClick={() => deleteNote(currentNote.id)}
        disabled={notes.length === 0}
      >
        <FaRegTrashCan />
      </button>
      <button
        className={`toolbar-button ${currentNote.pinned ? "active" : ""}`}
        title={currentNote.pinned ? "Unpin note" : "Pin note"}
        disabled={notes.length === 0}
        onClick={() => handlePinNote(currentNote.id)}
      >
        <FaMapPin />
      </button>
      <button
        className="toolbar-button"
        title="Download note as text file"
        onClick={() => downloadNote(`${currentNote.id}.txt`, currentNote.body)}
      >
        <FaDownload />
      </button>
      <form>
        <input
          type="search"
          placeholder="Search..."
          onChange={(event) => searchForNotes(event.target.value)}
          value={searchQuery}
        />
      </form>
      <ThemeSwitcher />
    </div>
  );
}

export default Toolbar;
