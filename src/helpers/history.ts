import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function redirect(to: string) {
  window.location.href = to;
}
