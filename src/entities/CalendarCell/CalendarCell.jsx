import React from 'react';

export const CalendarCell = ({
  day, isCurrentMonth, events, note, onClick, tooltip
}) => (
  <div
    style={{
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #eee',
      cursor: 'pointer',
      position: 'relative',
      background: events.length > 0 ? '#eaf4ff' : 'white',
      transition: 'background 0.2s',
      opacity: isCurrentMonth ? 1 : 0.5
    }}
    title={tooltip}
    onClick={onClick}
  >
    <div>{day}</div>
    {events.length > 0 && (
      <div style={{ color: '#4a90e2', fontSize: 18, marginTop: 2 }}>●</div>
    )}
    {note && note.emotion && (
      <div style={{ fontSize: 20, marginTop: 2 }}>{note.emotion}</div>
    )}
  </div>
); 