// Configuration
import { $html } from '../config';

export function isFirstRender(items) {
  return items && items.length === 0;
}

export function loadComponent(componentName) {
  try {
    const Component = require(`../../frontend/components/${$html().theme}/${componentName}`).default;

    return Component;
  } catch (e) {
    throw e;
  }
}
