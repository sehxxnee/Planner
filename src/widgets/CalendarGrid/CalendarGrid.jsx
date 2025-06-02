import React, { useState } from 'react';
import { useEventContext } from '../../shared/context/EventContext';
import { useNoteContext } from '../../shared/context/NoteContext';
import { CalendarCell } from '../../entities/CalendarCell/CalendarCell';
import { CalendarModal } from '../CalendarModal/CalendarModal';

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

  const getEventsForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getNoteForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return notes.find(n => n.date === dateStr);
  };

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
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
      const prevDay = getDaysInMonth(year, month - 1) - firstDayOfMonth + i + 1;
      days.push(
        <CalendarCell
          key={`empty-${i}`}
          day={prevDay}
          isCurrentMonth={false}
          events={[]}
          note={null}
          onClick={() => {}}
          tooltip={''}
        />
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const note = getNoteForDate(day);
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
        <CalendarCell
          key={day}
          day={day}
          isCurrentMonth={true}
          events={dayEvents}
          note={note}
          onClick={() => handleDayClick(day, true)}
          tooltip={tooltip}
        />
      );
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - (firstDayOfMonth + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <CalendarCell
          key={`next-${i}`}
          day={i}
          isCurrentMonth={false}
          events={[]}
          note={null}
          onClick={() => {}}
          tooltip={''}
        />
      );
    }

    return days;
  };

  // 모달에 표시할 일정/노트 정보
  const renderModal = () => {
    if (!modalOpen || !modalDate) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(modalDate).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dateStr);
    const note = notes.find(n => n.date === dateStr);
    return (
      <CalendarModal
        open={modalOpen}
        dateStr={dateStr}
        events={dayEvents}
        note={note}
        onClose={closeModal}
      />
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