import { getSchedules, setSchedules } from '../../entities/schedule/model/scheduleStore.js';
export function deleteSchedule(id) {
  const filtered = getSchedules().filter(item => item.id !== id);
  setSchedules(filtered);
  location.reload();
}