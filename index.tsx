
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  
  // On cache le loader immédiatement après le premier rendu
  const hideLoader = () => {
    const loader = document.getElementById('fallback-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  };

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Exécution de la suppression du loader
  hideLoader();
}

// Enregistrement sécurisé du Service Worker pour GitHub Pages
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    if (!window.location.host.includes('usercontent.goog')) {
      // Sur GitHub Pages, le chemin doit souvent être relatif au dossier du dépôt
      const swPath = window.location.pathname.includes('/Meddeb/') ? './sw.js' : '/sw.js';
      navigator.serviceWorker.register(swPath).catch(err => {
        console.warn('ServiceWorker non enregistré:', err);
      });
    }
  });
}
