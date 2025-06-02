import React, { useState } from 'react';
import { useEventContext } from '../../shared/context/EventContext';
import { EventForm } from '../../features/EventForm/EventForm';
import { EventCard } from '../../entities/EventCard/EventCard';

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
            <EventCard
              key={event.id}
              event={event}
              onEdit={openForm}
              onDelete={handleDeleteEvent}
              onToggleComplete={handleToggleComplete}
            />
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