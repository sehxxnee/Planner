import React, { useState } from 'react';

export const EventForm = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    onSubmit({
      id: initialData?.id || Date.now(),
      title,
      date,
      description,
      completed: initialData?.completed || false
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, minWidth: 320, maxWidth: 400, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ margin: 0, color: '#4a90e2' }}>{initialData ? '이벤트 수정' : '이벤트 추가'}</h3>
      <input type="text" placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }} required />
      <textarea placeholder="설명 (선택)" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, minHeight: 60 }} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', color: '#888' }}>취소</button>
        <button type="submit" style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 500 }}>{initialData ? '수정' : '추가'}</button>
      </div>
    </form>
  );
}; 