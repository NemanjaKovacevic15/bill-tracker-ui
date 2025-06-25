import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FavouritesProvider } from './context/FavouritesContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </React.StrictMode>
);
