import { getSchedules, setSchedules } from '../../entities/schedule/model/scheduleStore.js';
export function addSchedule({ date, content }) {
  const schedules = getSchedules();
  schedules.push({ id: Date.now(), date, content, done: false });
  setSchedules(schedules);
}
