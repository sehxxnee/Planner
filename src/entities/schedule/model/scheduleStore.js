export function getSchedules() {
  return JSON.parse(localStorage.getItem('schedules') || '[]');
}

export function setSchedules(data) {
  localStorage.setItem('schedules', JSON.stringify(data));
}