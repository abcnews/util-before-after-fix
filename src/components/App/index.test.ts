import App from './index';
import type { AppProps } from './index';

test('it renders', () => {
  const props: AppProps = { x: 42, y: 'text', z: true };
  const component = new App(props);

  expect(component.el.innerHTML).toContain(JSON.stringify(props));
});
