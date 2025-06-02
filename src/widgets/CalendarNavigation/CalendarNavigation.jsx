import React from 'react';
import { IconCircleButton } from '../../shared/ui/IconCircleButton';

export const CalendarNavigation = ({ currentDate, onPrevMonth, onNextMonth }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      gap: 16
    }}>
      <IconCircleButton
        icon="◀"
        onClick={onPrevMonth}
        ariaLabel="이전 달"
      />
      <h2 style={{ margin: 0 }}>{year}년 {month}월</h2>
      <IconCircleButton
        icon="▶"
        onClick={onNextMonth}
        ariaLabel="다음 달"
      />
    </div>
  );
}; 