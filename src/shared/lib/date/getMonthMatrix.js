export function getMonthMatrix(year, month) {
  // month: 0~11
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekDay = (firstDay.getDay() + 6) % 7; // 월요일 시작
  const daysInMonth = lastDay.getDate();

  let matrix = [];
  let week = [];
  let day = 1 - firstWeekDay;

  for (let i = 0; i < 6; i++) {
    week = [];
    for (let j = 0; j < 7; j++, day++) {
      const isCurrentMonth = day > 0 && day <= daysInMonth;
      week.push({
        day: isCurrentMonth ? day : '',
        isCurrentMonth
      });
    }
    matrix.push(week);
  }
  return matrix;
} 