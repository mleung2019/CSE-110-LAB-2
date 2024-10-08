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
        <form className="note-form">
          {/* NOTE POST OPTIONS */}
          <textarea placeholder="Note Title"></textarea>
          <textarea placeholder="Note Content"></textarea>

          <select id="category" name="category">
            <option value="">--Please choose a label--</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
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
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
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
