// Dependencies
import path from 'path';

// Utils
import { glob } from './utils/files';

export function getMedia() {
  return glob(path.join(__dirname, '../public/media'));
}
