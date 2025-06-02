import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => setNotes(prev => {
    // 같은 날짜에 여러 개 저장 가능
    return [...prev, { ...note, id: Date.now() }];
  });
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));
  const editNote = (note) => setNotes(prev => prev.map(n => (n.id === note.id ? note : n)));

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {children}
    </NoteContext.Provider>
  );
}; 