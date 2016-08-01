import * as Content from '../../lib/model';

export function getContent(language, callback) {
  const procedure = Content.getProcedure('getContent', language, ['language']);

  Content.query(procedure, callback, (result, callback) => {
    const data = result[0].length > 0 ? result[0] : false;

    return callback(data);
  });
}
