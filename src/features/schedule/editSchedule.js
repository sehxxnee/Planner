import { getSchedules, setSchedules } from '../../entities/schedule/model/scheduleStore.js';
export function editSchedule(id, newContent) {
  const schedules = getSchedules().map(item =>
    item.id === id ? { ...item, content: newContent } : item
  );
  setSchedules(schedules);
}
