import React, { useState } from 'react';
import { useEventContext } from '../../shared/context/EventContext';

export const EventPage = () => {
  const { events, addEvent, deleteEvent, editEvent } = useEventContext();
  const [showForm, setShowForm] = useState(false);
  const [editEventData, setEditEventData] = useState(null);

  // 이벤트 추가
  const handleAddEvent = (event) => {
    addEvent({ ...event, completed: false });
    setShowForm(false);
  };

  // 이벤트 삭제
  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  // 이벤트 수정
  const handleEditEvent = (event) => {
    editEvent(event);
    setEditEventData(null);
    setShowForm(false);
  };

  // 완료 체크박스 토글
  const handleToggleComplete = (event) => {
    editEvent({ ...event, completed: !event.completed });
  };

  // 폼 열기
  const openForm = (event = null) => {
    setEditEventData(event);
    setShowForm(true);
  };

  // 폼 닫기
  const closeForm = () => {
    setEditEventData(null);
    setShowForm(false);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* 이벤트가 없을 때 */}
      {events.length === 0 && !showForm && (
        <div style={{ textAlign: 'center' }}>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="No Event" style={{ width: 220, marginBottom: 24, borderRadius: 16 }} />
          <h2 style={{ color: '#444', marginBottom: 8 }}>아직 이벤트가 없어요.</h2>
          <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '12px 32px', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginTop: 18 }}>+ 이벤트 추가</button>
        </div>
      )}
      {/* 이벤트가 있을 때 */}
      {events.length > 0 && !showForm && (
        <div style={{ width: '100%', maxWidth: 500, margin: '40px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '10px 24px', fontSize: 15, cursor: 'pointer' }}>+ 이벤트 추가</button>
          </div>
          {events.map(event => (
            <div key={event.id} style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24, marginBottom: 20, position: 'relative', opacity: event.completed ? 0.5 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <input type="checkbox" checked={!!event.completed} onChange={() => handleToggleComplete(event)} />
                <span style={{ fontSize: 18, fontWeight: 600, textDecoration: event.completed ? 'line-through' : 'none' }}>{event.title}</span>
              </div>
              <div style={{ color: '#888', marginBottom: 8 }}>{event.date}</div>
              <div style={{ color: '#555', marginBottom: 16 }}>{event.description}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openForm(event)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', color: '#4a90e2', fontWeight: 500 }}>수정</button>
                <button onClick={() => handleDeleteEvent(event.id)} style={{ background: '#ffeaea', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', color: '#e24a4a', fontWeight: 500 }}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 이벤트 추가/수정 폼 */}
      {showForm && (
        <EventForm
          onSubmit={editEventData ? handleEditEvent : handleAddEvent}
          onCancel={closeForm}
          initialData={editEventData}
        />
      )}
    </div>
  );
};

// 이벤트 폼 컴포넌트
const EventForm = ({ onSubmit, onCancel, initialData }) => {
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
      description
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