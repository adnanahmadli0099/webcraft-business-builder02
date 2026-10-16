import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party extension injection rejections (e.g. MetaMask, phantom)
if (typeof window !== 'undefined') {
  const isExtensionError = (err: any) => {
    if (!err) return false;
    const str = String(err?.message || err?.reason || err?.stack || err || '');
    return (
      str.includes('MetaMask') ||
      str.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      str.includes('chrome-extension://') ||
      str.includes('inpage.js') ||
      str.includes('ethereum')
    );
  };

  window.addEventListener(
    'error',
    (e) => {
      if (
        isExtensionError(e.error) ||
        isExtensionError(e.message) ||
        (e.filename && e.filename.includes('chrome-extension://'))
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      if (isExtensionError(e.reason)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);
