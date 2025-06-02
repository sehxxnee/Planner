import React from 'react';

export const CalendarModal = ({ open, dateStr, events, note, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
        padding: 32,
        minWidth: 280,
        maxWidth: '90vw',
        minHeight: 120,
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>×</button>
        <h3 style={{ margin: 0, marginBottom: 16 }}>{dateStr} 일정/노트</h3>
        {events.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center' }}>일정 없음</div>
        ) : (
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {events.map(ev => (
              <li key={ev.id} style={{ marginBottom: 12, fontSize: 16 }}>
                <span style={{ fontWeight: 600 }}>{ev.title}</span>
                {ev.description && <span style={{ color: '#888' }}> - {ev.description}</span>}
                {ev.completed && <span style={{ color: '#4a90e2', marginLeft: 8 }}>(완료)</span>}
              </li>
            ))}
          </ul>
        )}
        <hr style={{ margin: '18px 0' }} />
        <div style={{ color: '#222', fontSize: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>노트</div>
          {note ? (
            <div>
              {note.emotion && <span style={{ fontSize: 22, marginRight: 8 }}>감정: {note.emotion}</span>}
              <div style={{ marginTop: 6, color: '#555' }}>{note.text}</div>
            </div>
          ) : (
            <div style={{ color: '#888' }}>노트 없음</div>
          )}
        </div>
      </div>
    </div>
  );
}; 