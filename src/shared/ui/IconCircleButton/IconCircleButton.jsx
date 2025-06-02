import React from 'react';

export const IconCircleButton = ({ icon, onClick, style, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      backgroundColor: '#e3eafc',
      border: 'none',
      borderRadius: '50%',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      color: '#4a90e2',
      boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
      cursor: 'pointer',
      transition: 'background 0.2s',
      ...style
    }}
    onMouseOver={e => e.currentTarget.style.backgroundColor = '#d0e2ff'}
    onMouseOut={e => e.currentTarget.style.backgroundColor = '#e3eafc'}
  >
    {icon}
  </button>
); 