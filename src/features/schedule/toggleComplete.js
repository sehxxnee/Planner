import { getSchedules, setSchedules } from '../../entities/schedule/model/scheduleStore.js';
export function toggleComplete(id) {
  const schedules = getSchedules().map(item =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  setSchedules(schedules);
  location.reload();
}