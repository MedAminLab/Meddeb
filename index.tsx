
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Enregistrement du Service Worker avec chemin relatif pour GitHub Pages
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Utilisation de ./sw.js au lieu de /sw.js
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('SW enregistré avec succès dans le scope:', reg.scope);
    }).catch(err => {
      console.log('Échec de l\'enregistrement du SW: ', err);
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Impossible de trouver l'élément root");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
