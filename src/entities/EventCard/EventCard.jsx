import React from 'react';

export const EventCard = ({ event, onEdit, onDelete, onToggleComplete }) => (
  <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24, marginBottom: 20, position: 'relative', opacity: event.completed ? 0.5 : 1 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <input type="checkbox" checked={!!event.completed} onChange={() => onToggleComplete(event)} />
      <span style={{ fontSize: 18, fontWeight: 600, textDecoration: event.completed ? 'line-through' : 'none' }}>{event.title}</span>
    </div>
    <div style={{ color: '#888', marginBottom: 8 }}>{event.date}</div>
    <div style={{ color: '#555', marginBottom: 16 }}>{event.description}</div>
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => onEdit(event)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', color: '#4a90e2', fontWeight: 500 }}>수정</button>
      <button onClick={() => onDelete(event.id)} style={{ background: '#ffeaea', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', color: '#e24a4a', fontWeight: 500 }}>삭제</button>
    </div>
  </div>
); 