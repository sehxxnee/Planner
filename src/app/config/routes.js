export const routes = {
  '/': 'main',
  '#/view': 'view',
  '#/calendar': 'calendar',
};

export function getCurrentRoute() {
  if (location.hash.startsWith('#/calendar')) return 'calendar';
  if (location.hash.startsWith('#/view')) return 'view';
  return 'main';
}

