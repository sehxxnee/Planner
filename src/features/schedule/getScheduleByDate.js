import { getSchedules } from '../../entities/schedule/model/scheduleStore.js';
export function getScheduleByDate(date) {
  return getSchedules().filter(item => item.date === date);
}
