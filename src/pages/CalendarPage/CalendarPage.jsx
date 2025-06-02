import React from 'react';
import { CalendarGrid } from '../../widgets/CalendarGrid/CalendarGrid';
import { CalendarNavigation } from '../../widgets/CalendarNavigation/CalendarNavigation';

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <CalendarNavigation 
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid currentDate={currentDate} />
    </div>
  );
}; 