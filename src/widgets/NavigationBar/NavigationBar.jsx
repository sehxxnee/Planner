import React from 'react';
import { NavigationButton } from '../../shared/ui/NavigationButton';

export const NavigationBar = () => {
  const handleCalendarClick = () => {
    location.hash = '#/';
  };

  const handleEventClick = () => {
    location.hash = '#/event';
  };

  const handleNoteClick = () => {
    location.hash = '#/note';
  };

  return (
    <nav style={{
      backgroundColor: '#4a90e2',
      padding: '1rem 2vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      minWidth: 0,
      maxWidth: '100vw',
      boxSizing: 'border-box'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        whiteSpace: 'nowrap',
        minWidth: 0
      }}>
        일정 관리
      </div>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        minWidth: 0,
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <NavigationButton onClick={handleCalendarClick}>캘린더</NavigationButton>
        <NavigationButton onClick={handleEventClick}>이벤트</NavigationButton>
        <NavigationButton onClick={handleNoteClick}>노트</NavigationButton>
      </div>
    </nav>
  );
}; 