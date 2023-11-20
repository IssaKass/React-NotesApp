import React from "react";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

const NOTES_KEY = `notes_519b0cb6-3886-5ad2-879a-d5946b5ec8ea`;

function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem(NOTES_KEY)) || []
  );

  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0] || {};

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchedNotes, setSearchedNotes] = React.useState(notes);

  React.useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  React.useEffect(() => {
    setSearchedNotes(
      notes
        .sort((a, b) => b.editedAt - a.editedAt)
        .filter((note) =>
          note.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [notes, searchQuery]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "",
      createdAt: Date.now(),
      editedAt: Date.now(),
      pinned: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    const newArr = [];
    notes.forEach((note) => {
      note.id === currentNoteId
        ? newArr.unshift({ ...note, body: text, editedAt: Date.now() })
        : newArr.push(note);
    });
    setNotes(newArr);
  }

  function handlePinNote(noteId) {
    const newArr = notes.map((note) =>
      note.id === noteId
        ? { ...note, editedAt: Date.now(), pinned: !note.pinned }
        : note
    );
    setNotes(newArr);
  }

  function deleteNote(noteId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Note?"
    );
    if (!confirmed) {
      return;
    }
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  function searchForNotes(query) {
    setSearchQuery(query);
  }

  function downloadNoteAsTextFile(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename || "exported_note.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="app">
      <Toolbar
        notes={notes}
        currentNote={currentNote}
        createNote={createNewNote}
        deleteNote={deleteNote}
        handlePinNote={handlePinNote}
        downloadNote={downloadNoteAsTextFile}
        searchForNotes={searchForNotes}
        searchQuery={searchQuery}
      />
      <Split
        sizes={[10, 90]}
        minSize={[200, 0]}
        maxSize={[400, 10000]}
        direction="horizontal"
        className="split"
      >
        <Sidebar
          notes={searchedNotes}
          currentNote={currentNote}
          setCurrentNoteId={setCurrentNoteId}
        />
        <Editor
          notes={searchedNotes}
          currentNote={currentNote}
          updateNote={updateNote}
        />
      </Split>
    </div>
  );
}

export default App;
