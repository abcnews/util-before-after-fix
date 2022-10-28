import styles from './styles.scss';

export type AppProps = {
  x: number;
  y: string;
  z: boolean;
};

export default class App {
  el: Element;

  constructor({ x, y, z }: AppProps) {
    this.el = document.createElement('div');
    this.el.className = styles.root;
    this.el.innerHTML = ``;
  }
}
