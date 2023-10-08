import { useEffect, useState } from "react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [chuj, setChuj] = useState(JSON.parse(localStorage.getItem("react-notes-app-data")))

  const [newNote, setNewNote] = useState("");
  const [searchText, setSearchText] = useState("");
  const MaxInputLength = 200;

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      console.log(savedNotes);
      setNotes(chuj);
      console.log(notes);
    }
  }, []);

  

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote) {
      let num = notes.length + 1;
      let newEntry = { id: num, text: newNote };
      setNotes([...notes, newEntry]);
      setNewNote("");
    }
  };

  const deleteNotes = (id) => {
    let newNotes = notes.filter((notes) => notes.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <input
        type="text"
        className="search"
        placeholder="Search something"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="notesContainer">
        {notes
          .filter((e) => e.text.includes(searchText)) 
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((note, index) => {
            return (
              <React.Fragment key={note.id}>
                <div className="noteItem">
                  <div className="index">{index + 1}</div>
                  <div className="noteText">{note.text}</div>
                  <button onClick={() => deleteNotes(note.id)}>
                    <FaTrash />
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        <div className="notesInput">
          <textarea
            name="textInput"
            placeholder="Write something..."
            className="textInput"
            cols="30"
            maxLength={200}
            rows="10"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
          <div>
            <span>{MaxInputLength - newNote.length} remaining</span>
            <button onClick={addNote}>
              <FaSave />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
