import React, { useState } from 'react';
import { useNoteContext } from '../../shared/context/NoteContext';
import { NoteForm } from '../../features/NoteForm/NoteForm';

export const NotePage = () => {
  const { notes, addNote } = useNoteContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editNote, setEditNote] = useState(null);

  const openForm = (date = '', note = null) => {
    setSelectedDate(date);
    setEditNote(note);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditNote(null);
    setSelectedDate('');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {notes.length === 0 && !showForm && (
        <div style={{ textAlign: 'center' }}>
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="No Note" style={{ width: 220, marginBottom: 24, borderRadius: 16 }} />
          <h2 style={{ color: '#444', marginBottom: 8 }}>아직 노트가 없어요.</h2>
          <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '12px 32px', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' , marginTop: 18}}>+ 노트 추가</button>
        </div>
      )}
      {notes.length > 0 && !showForm && (
        <div style={{ width: '100%', maxWidth: 600, margin: '40px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '10px 24px', fontSize: 15, cursor: 'pointer' }}>+ 노트 추가</button>
          </div>
          {notes.map(note => (
            <div key={note.id} style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24, marginBottom: 20, position: 'relative' }}>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{note.date}</div>
              <div style={{ color: '#555', marginBottom: 16 }}>{note.text}</div>
              {note.emotion && (
                <div style={{ fontSize: 22, marginBottom: 8 }}>감정: {note.emotion}</div>
              )}
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <NoteForm
          onSubmit={note => { addNote(note); closeForm(); }}
          onCancel={closeForm}
          initialData={editNote}
          initialDate={selectedDate}
        />
      )}
    </div>
  );
}; 