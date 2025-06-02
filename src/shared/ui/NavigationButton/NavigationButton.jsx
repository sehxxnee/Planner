import React from 'react';

export const NavigationButton = ({ children, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: 'transparent',
      border: '1px solid white',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      minWidth: 0,
      whiteSpace: 'nowrap',
      ...style
    }}
  >
    {children}
  </button>
); 