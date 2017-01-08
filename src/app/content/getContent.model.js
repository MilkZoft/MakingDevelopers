// Helpers
import * as Content from '../../lib/model';

/**
 * Returns content from database
 *
 * @param {string} language Language
 * @param {function} callback Callback
 * @returns {function} Callback
 */
export function getContent(language, callback) {
  let procedure;

  if (language) {
    procedure = Content.getProcedure('getContent', language, ['language']);
  } else {
    procedure = Content.getProcedure('getAllContent');
  }

  Content.query(procedure, callback, (result, callback) => {
    const data = result[0].length > 0 ? result[0] : false;

    return callback(data);
  });
}
