import React from 'react';
 
export const CalendarCell = ({ day, isCurrentMonth }) => (
  <td className={isCurrentMonth ? '' : 'dimmed'}>{day}</td>
); 