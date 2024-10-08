// Style
import "./App.css";

// Hooks
import { useEffect, useState } from "react";

// Note about useContext:
// useContext is used when data needs to be shared across
// different components. In this case, it is not necessary.

// Data structures and dummy data
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module

// Theming
import { ThemeContext, themes } from "./themeContext";
import { create } from "domain";
import { LanguageVariant } from "typescript";

function App() {
  // noteList
  const [noteList, setNoteList] = useState(dummyNotesList);

  // Like button functionality
  const handleLike = (noteId: number) => {
    const updatedList = [...noteList];
    updatedList.forEach((note) => {
      // Toggle isLiked on the note that matches the noteId
      if (note.id === noteId) {
        note.isLiked = note.isLiked ? false : true;
      }
    });

    // Change noteList with updatedList
    setNoteList(updatedList);
  };

  // Note creation functionality
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isLiked: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  // Note submit button functionality
  const createNoteHandler = () => {
    // Set note id by using the length of noteList
    createNote.id = noteList.length + 1;
    // Post will not be liked on creation
    createNote.isLiked = false;
    setNoteList([...noteList, createNote]);

    // Reset fields after submission
    document.forms[0].reset();
  };

  // Theming functionality
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // Change body style for theming when currentTheme changes
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
  }, [currentTheme]);

  // Theme button functionality
  const handleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className={`app-container ${
          currentTheme === themes.light ? "light-mode" : "dark-mode"
        }`}
        style={{
          color: currentTheme.foreground,
        }}
      >
        <form
          className="note-form"
          onSubmit={(e) => {
            // Prevent refresh on submit
            e.preventDefault();
            createNoteHandler();
          }}
        >
          {/* NOTE POST OPTIONS */}
          <textarea
            id="title"
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></textarea>

          <textarea
            id="content"
            placeholder="Note Content"
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>

          <select
            id="category"
            name="category"
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>

          {/* SUBMIT BUTTON */}
          <button type="submit">Create Note</button>
        </form>

        <div className="notes-grid">
          {noteList.map((note) => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
                <button onClick={() => handleLike(note.id)}>
                  {note.isLiked ? "❤️" : "♡"}
                </button>
                <button>x</button>
              </div>
              <h2 contentEditable="true"> {note.title} </h2>
              <p contentEditable="true"> {note.content} </p>
              <p contentEditable="true"> {note.label} </p>
            </div>
          ))}
        </div>

        {/* THEME BUTTON */}
        <div className="theme-container">
          <button onClick={handleTheme}>Change Theme</button>
        </div>

        <br />

        {/* FAVORITES LIST */}
        <div className="favorites-list">
          <h2>List of favorites:</h2>
          {/* Filter by liked notes, then map to HTML */}
          {noteList
            .filter((note) => note.isLiked)
            .map((note) => (
              <p> {note.title} </p>
            ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
