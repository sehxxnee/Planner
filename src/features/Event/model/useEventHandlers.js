import { useState } from 'react';
import { useEventContext } from '../../../shared/context/EventContext';

export function useEventHandlers() {
  const { addEvent, deleteEvent, editEvent } = useEventContext();
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

  return {
    showForm, setShowForm, editEventData, setEditEventData,
    handleAddEvent, handleDeleteEvent, handleEditEvent, handleToggleComplete, openForm, closeForm
  };
} 