import React, { useState } from 'react';
import { analyzeEmotion } from '../../shared/api/analyzeEmotion';

export const NoteForm = ({ onSubmit, onCancel, initialData, initialDate }) => {
  const [date, setDate] = useState(initialData?.date || initialDate || '');
  const [text, setText] = useState(initialData?.text || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !text) return;
    setLoading(true);
    let emotion = await analyzeEmotion(text);
    setLoading(false);
    onSubmit({
      id: initialData?.id || Date.now(),
      date,
      text,
      emotion
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, minWidth: 320, maxWidth: 400, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ margin: 0, color: '#4a90e2' }}>{initialData ? '노트 수정' : '노트 추가'}</h3>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }} required />
      <textarea placeholder="오늘의 일기/노트" value={text} onChange={e => setText(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, minHeight: 80 }} required />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', color: '#888' }}>취소</button>
        <button type="submit" disabled={loading} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 500 }}>{loading ? '분석 중...' : (initialData ? '수정' : '추가')}</button>
      </div>
    </form>
  );
}; 