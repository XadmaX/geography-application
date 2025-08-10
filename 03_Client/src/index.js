/* istanbul ignore file */
/*
 * TODO: Migrate client from CRA to Vite for faster dev/build
 * TODO: After Vite, evaluate React 19 + MUI compatibility
 * TODO: Add CI step for building/pushing client Docker image
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
