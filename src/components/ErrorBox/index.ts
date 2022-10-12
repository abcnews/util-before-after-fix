import styles from './styles.scss';

type ErrorBoxProps = {
  error: Error;
}

export default class ErrorBox {
  el: Element;

  constructor({ error }: ErrorBoxProps) {
    const el = (this.el = document.createElement('pre'));

    el.className = styles.root;
    el.textContent = `${String(error)}\n\n${error.stack}`;

    (function logOnMount() {
      if (!el.parentNode) {
        return setTimeout(logOnMount, 100);
      }

      console.error(error);
    })();
  }
}
