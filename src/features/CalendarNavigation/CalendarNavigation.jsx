import React from 'react';
import { Button } from '../../shared/ui/Button';

export const CalendarNavigation = ({ year, month, onPrev, onNext }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Button onClick={onPrev}>{'<'}</Button>
    <span>{year}년 {month + 1}월</span>
    <Button onClick={onNext}>{'>'}</Button>
  </div>
); 