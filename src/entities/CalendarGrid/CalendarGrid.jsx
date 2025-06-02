import React from 'react';
import { CalendarCell } from '../CalendarCell';

export const CalendarGrid = ({ matrix, tableClass }) => (
  <table className={tableClass}>
    <thead>
      <tr>
        <th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th>
      </tr>
    </thead>
    <tbody>
      {matrix.map((week, i) => (
        <tr key={i}>
          {week.map((cell, j) => (
            <CalendarCell key={j} {...cell} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
); 