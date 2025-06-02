import React from 'react';

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
        <button 
          onClick={handleCalendarClick}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            minWidth: 0,
            whiteSpace: 'nowrap'
          }}
        >
          캘린더
        </button>
        <button 
          onClick={handleEventClick}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            minWidth: 0,
            whiteSpace: 'nowrap'
          }}
        >
          이벤트
        </button>
        <button 
          onClick={handleNoteClick}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            minWidth: 0,
            whiteSpace: 'nowrap'
          }}
        >
          노트
        </button>
      </div>
    </nav>
  );
}; 