
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  
  const hideLoader = () => {
    const loader = document.getElementById('fallback-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  };

  root.render(
    React.createElement(React.StrictMode, null, 
      React.createElement(App, null)
    )
  );

  hideLoader();
}

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    if (!window.location.host.includes('usercontent.goog')) {
      const swPath = window.location.pathname.includes('/Meddeb/') ? './sw.js' : '/sw.js';
      navigator.serviceWorker.register(swPath).catch(err => {
        console.warn('ServiceWorker non enregistré:', err);
      });
    }
  });
}
