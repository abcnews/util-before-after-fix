import acto from '@abcnews/alternating-case-to-object';
import { whenDOMReady } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App';
import type { AppProps } from './components/App';
import './styles.scss';

let appMountEl: Mount;
let appProps: AppProps;

function renderApp() {
  render(new App(appProps).el, appMountEl);
}

whenDOMReady.then(() => {
  [appMountEl] = selectMounts('utilbeforeafterfix');

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl)) as AppProps;
    renderApp();
  }
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      renderApp();
    } catch (err) {
      import('./components/ErrorBox').then(({ default: ErrorBox }) => {
        render(new ErrorBox({ error: err as Error }).el, appMountEl);
      });
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[util-before-after-fix] public path: ${__webpack_public_path__}`);
}

function render(el: Element, parentEl: Element | null) {
  if (parentEl === null) {
    throw new Error('parentEl is not an Element');
  }

  while (parentEl.firstElementChild) {
    parentEl.removeChild(parentEl.firstElementChild);
  }

  parentEl.appendChild(el);
}
