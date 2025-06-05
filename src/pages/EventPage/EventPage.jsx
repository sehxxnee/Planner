import React, { useState } from 'react';
import { useEventContext } from '../../shared/context/EventContext';
import { EventForm } from '../../features/EventForm/EventForm';

export const EventPage = () => {
  const { events, addEvent, deleteEvent, editEvent, toggleEventComplete } = useEventContext();
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteEvent(id);
    }
  };

  const handleEventSubmit = (event) => {
    if (editingEvent) {
      editEvent(editingEvent.id, event);
    } else {
      addEvent(event);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleEventToggle = (id) => {
    toggleEventComplete(id);
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (a.date === b.date) {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>일정 관리</h2>
        <button
          onClick={handleAddEvent}
          style={{
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          일정 추가
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {sortedEvents.map(event => (
          <div
            key={event.id}
            style={{
              padding: '16px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <input
              type="checkbox"
              checked={event.completed}
              onChange={() => handleEventToggle(event.id)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '16px',
                color: event.completed ? '#999' : '#333',
                textDecoration: event.completed ? 'line-through' : 'none',
                marginBottom: '4px'
              }}>
                {event.text}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>
                {(() => {
                  const [year, month, day] = event.date.split('-').map(Number);
                  const date = new Date(year, month - 1, day);
                  return date.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  });
                })()}
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={() => handleEditEvent(event)}
                style={{
                  padding: '6px 12px',
                  background: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                수정
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                style={{
                  padding: '6px 12px',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEventForm && (
        <EventForm
          onSubmit={handleEventSubmit}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          initialDate={editingEvent?.date || new Date().toISOString().split('T')[0]}
          initialData={editingEvent}
        />
      )}
    </div>
  );
}; 