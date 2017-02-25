// Configuration
import { $html } from '../config';

export function isFirstRender(items) {
  return items && items.length === 0;
}

export function loadComponent(componentPath, returnClass) {
  try {
    const Component = require(`../../frontend/components/${$html().theme}/${componentPath}`);

    if (returnClass) {
      const parts = componentPath.split('/');
      const componentName = parts.length > 1 ? parts[1] : parts[0];

      return Component[componentName];
    }

    return Component.default;
  } catch (e) {
    throw e;
  }
}

export function loadImage(imagePath) {
  return `themes/${$html().theme}/images/${imagePath}`;
}

export function setClass(condition, className1, className2) {
  return condition ? className1 : className2 ? className2 : '';
}
