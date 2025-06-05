import React from 'react';
import { NavigationButton } from '../../shared/ui/NavigationButton';

export const NavigationBar = () => {
  const navigate = (path) => {
    window.location.hash = path;
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#4a90e2',
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <NavigationButton onClick={() => navigate('/calendar')}>캘린더</NavigationButton>
      <NavigationButton onClick={() => navigate('/event')}>이벤트</NavigationButton>
      <NavigationButton onClick={() => navigate('/note')}>노트</NavigationButton>
      <NavigationButton onClick={() => navigate('/graph')}>그래프</NavigationButton>
    </nav>
  );
}; 