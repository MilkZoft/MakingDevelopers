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
