import { getSchedules } from '../../entities/schedule/model/scheduleStore.js';
import { editSchedule } from '../../features/schedule/editSchedule.js';
import { deleteSchedule } from '../../features/schedule/removeSchedule.js';

export function renderViewPage() {
  document.body.innerHTML = `<div id="view"></div>`;

  const params = new URLSearchParams(location.hash.split('?')[1]);
  const id = parseInt(params.get('id'));
  const schedule = getSchedules().find(item => item.id === id);

  if (!schedule) {
    document.getElementById('view').innerHTML = `<p>일정을 찾을 수 없습니다.</p>`;
    return;
  }

  document.getElementById('view').innerHTML = `
    <h2>일정 상세보기</h2>
    <p>날짜: ${schedule.date}</p>
    <input type="text" id="edit-content" value="${schedule.content}" />
    <button id="save-btn">수정</button>
    <button id="delete-btn">삭제</button>
    <button onclick="location.hash = '#'">뒤로가기</button>
  `;

  document.getElementById('save-btn').addEventListener('click', () => {
    const newContent = document.getElementById('edit-content').value;
    editSchedule(schedule.id, newContent);
    location.hash = '#';
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
    deleteSchedule(schedule.id);
    location.hash = '#';
  });
}
