import { radius } from './radius.js';
import { shadow } from './shadow.js';
import { layout, spacing } from './spacing.js';
import { typography } from './typography.js';

export const colors = {
  brand: {
    green: '#0d3b2e',
    greenHover: '#143f31',
    gold: '#d3a86a',
    mint: '#cdebf6',
    peach: '#f8c3b6'
  },
  text: {
    strong: '#1f1710',
    body: '#4d4035',
    muted: '#7b6a5a',
    inverse: '#ffffff'
  },
  surface: {
    page: '#fffdf8',
    soft: '#f8f5ee',
    glass: 'rgba(255, 255, 255, 0.72)',
    strong: 'rgba(255, 255, 255, 0.92)'
  },
  border: {
    soft: 'rgba(216, 200, 184, 0.78)',
    glass: 'rgba(255, 255, 255, 0.78)'
  },
  feedback: {
    danger: '#b25449',
    success: '#0d3b2e',
    warning: '#d3a86a'
  }
};

export const transition = {
  fast: '180ms ease',
  base: '220ms ease',
  smooth: '260ms ease',
  slow: '420ms ease'
};

export const zIndex = {
  base: 0,
  dropdown: 30,
  sticky: 50,
  drawer: 70,
  overlay: 90,
  toast: 100
};

export const opacity = {
  disabled: 0.45,
  muted: 0.68,
  glass: 0.72,
  visible: 1
};

export const duration = {
  micro: 180,
  base: 220,
  reveal: 520,
  float: 7000
};

export const designTokens = {
  colors,
  duration,
  layout,
  opacity,
  radius,
  shadow,
  spacing,
  transition,
  typography,
  zIndex
};
