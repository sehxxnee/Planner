export function createScheduleItem(schedule, onToggle, onDelete) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = schedule.done;
  checkbox.addEventListener('change', () => onToggle(schedule.id));

  const span = document.createElement('span');
  span.textContent = `${schedule.date}: ${schedule.content}`;
  if (schedule.done) span.style.textDecoration = 'line-through';
  span.style.cursor = 'pointer';
  span.addEventListener('click', () => {
    location.hash = `#/view?id=${schedule.id}`;
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  delBtn.addEventListener('click', () => onDelete(schedule.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}