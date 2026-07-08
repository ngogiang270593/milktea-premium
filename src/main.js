import './assets/css/base.css';
import './assets/css/components.css';
import './assets/css/utilities.css';
import { renderApp } from './App.js';
import { initAppInteractions } from './utils/animations.js';

renderApp().then(initAppInteractions);
