
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  const loader = document.getElementById('fallback-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 400);
  }
}

// Enregistrement sécurisé du Service Worker
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    // On n'enregistre le SW que si l'origine correspond pour éviter les erreurs de preview
    if (!window.location.host.includes('usercontent.goog')) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('ServiceWorker non enregistré (environnement de dev)');
      });
    }
  });
}
