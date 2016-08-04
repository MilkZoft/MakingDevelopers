// NPM Dependencies
import { minify } from 'html-minifier';

// Configuration
import { $html } from './config';

/**
 * Compress the HTML Output
 *
 * @param {object} content Handlebars content
 * @returns {string} Compressed html
 */
export function compress(content) {
  if (!$html().minify) {
    return content.fn(this);
  }

  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}
