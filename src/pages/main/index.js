import { addSchedule } from '../../features/schedule/addSchedule.js';
import { deleteSchedule } from '../../features/schedule/removeSchedule.js';
import { toggleComplete } from '../../features/schedule/toggleComplete.js';
import { getScheduleByDate } from '../../features/schedule/getScheduleByDate.js';
import { getSchedules } from '../../entities/schedule/model/scheduleStore.js';
import { createScheduleItem } from '../../entities/schedule/ui/ScheduleItem.js';

export function renderMainPage() {
  document.body.innerHTML = `
    <h1>일정 플래너</h1>
    <button id="go-calendar" style="margin-bottom:16px;">캘린더로 이동</button>
    <form id="schedule-form">
      <input type="date" id="date" required>
      <input type="text" id="content" placeholder="일정 내용" required>
      <button type="submit">추가</button>
    </form>
    <input type="date" id="filter-date">
    <ul id="schedule-list"></ul>
  `;

  const form = document.getElementById('schedule-form');
  const list = document.getElementById('schedule-list');
  const filterDate = document.getElementById('filter-date');
  const goCalendarBtn = document.getElementById('go-calendar');

  goCalendarBtn.addEventListener('click', () => {
    location.hash = '#/calendar';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;
    addSchedule({ date, content });
    form.reset();
    renderList();
  });

  filterDate.addEventListener('change', renderList);

  function renderList() {
    list.innerHTML = '';
    const selected = filterDate.value;
    const items = selected ? getScheduleByDate(selected) : getSchedules();

    items.forEach(item => {
      const li = createScheduleItem(item, toggleComplete, deleteSchedule);
      list.appendChild(li);
    });
  }

  renderList();
}
