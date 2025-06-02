import React, { useState } from 'react';
import { useEventContext } from '../../shared/context/EventContext';
import { useNoteContext } from '../../shared/context/NoteContext';

export const CalendarGrid = ({ currentDate }) => {
  const { events } = useEventContext();
  const { notes } = useNoteContext();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // 해당 날짜에 이벤트가 있는지 확인
  const getEventsForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  // 해당 날짜에 노트(일기)가 있는지 확인
  const getNoteForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return notes.find(n => n.date === dateStr);
  };

  const handleDayClick = (day) => {
    setModalDate(day);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalDate(null);
  };

  const renderCalendarDays = () => {
    const days = [];
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일 헤더 추가
    weekdays.forEach(day => {
      days.push(
        <div key={`header-${day}`} style={{
          padding: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5'
        }}>
          {day}
        </div>
      );
    });

    // 이전 달의 날짜들
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} style={{
          padding: '10px',
          textAlign: 'center',
          color: '#ccc'
        }}>
          {getDaysInMonth(year, month - 1) - firstDayOfMonth + i + 1}
        </div>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const note = getNoteForDate(day);
      // 툴크 내용 구성
      let tooltip = '';
      if (dayEvents.length > 0) {
        tooltip += `일정: ${dayEvents.map(e => e.title + (e.description ? ` (${e.description})` : '')).join(', ')}\n`;
      }
      if (note && note.emotion) {
        tooltip += `감정: ${note.emotion}\n`;
      }
      if (note && note.text) {
        tooltip += `노트: ${note.text}`;
      }
      tooltip = tooltip.trim();
      days.push(
        <div key={day} style={{
          padding: '10px',
          textAlign: 'center',
          border: '1px solid #eee',
          cursor: 'pointer',
          position: 'relative',
          background: dayEvents.length > 0 ? '#eaf4ff' : 'white',
          transition: 'background 0.2s'
        }}
          title={tooltip}
          onClick={() => handleDayClick(day)}
        >
          <div>{day}</div>
          {dayEvents.length > 0 && (
            <div style={{
              color: '#4a90e2',
              fontSize: 18,
              marginTop: 2
            }}>●</div>
          )}
          {note && note.emotion && (
            <div style={{
              fontSize: 20,
              marginTop: 2
            }}>{note.emotion}</div>
          )}
        </div>
      );
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - (firstDayOfMonth + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} style={{
          padding: '10px',
          textAlign: 'center',
          color: '#ccc'
        }}>
          {i}
        </div>
      );
    }

    return days;
  };

  // 모달에 표시할 일정 목록
  const renderModal = () => {
    if (!modalOpen || !modalDate) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(modalDate).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dateStr);
    const note = notes.find(n => n.date === dateStr);
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
      }} onClick={closeModal}>
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
          <button onClick={closeModal} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>×</button>
          <h3 style={{ margin: 0, marginBottom: 16 }}>{dateStr} 일정/노트</h3>
          {dayEvents.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center' }}>일정 없음</div>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {dayEvents.map(ev => (
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

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '1px',
      backgroundColor: '#eee',
      position: 'relative'
    }}>
      {renderCalendarDays()}
      {renderModal()}
    </div>
  );
}; 