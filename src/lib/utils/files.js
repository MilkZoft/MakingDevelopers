// Dependencies
import fs from 'fs';
import path from 'path';

// Utils
import { isDefined } from './is';

// Configuration
import { $baseUrl } from '../config';

/**
 * Returns the urls of the media inside a given dir
 *
 * @param {string} dir Directory
 * @param {array} _files Files
 * @param {array} elements Elements
 * @returns {array} Media Elements
 */
export function glob(dir, _files, elements) {
  const files = fs.readdirSync(dir);
  let name;
  let tmp;
  let url;
  let fileInfo;

  _files = _files || [];
  elements = elements || [];

  for (const i in files) {
    if (files[i] !== '.DS_Store' && files[i] !== '.gitkeep') {
      name = `${dir}/${files[i]}`;

      if (fs.statSync(name).isDirectory()) {
        glob(name, _files, elements);
      } else {
        tmp = name.split('/public/');

        if (isDefined(tmp[1])) {
          url = `${$baseUrl()}/${tmp[1]}`;

          _files.push(name);

          fileInfo = getFileInfo(tmp[1]);

          elements.push({
            name: `${fileInfo.name}.${fileInfo.extension}`,
            extension: fileInfo.extension,
            size: getFileSize(tmp[1]),
            url
          });
        }
      }
    }
  }

  return elements;
}

export function getImageFormats() {
  return ['png', 'jpg', 'jpeg', 'gif'];
}

export function getFileFormats() {
  return {
    'pdf': 'pdf',
    'docx': 'word',
    'js': 'code',
    'json': 'code',
    'mp4': 'video',
    'rar': 'zip',
    'sql': 'code',
    'zip': 'zip'
  };
}

export function getFileInfo(file) {
  const filename = file.split('/').pop();
  const parts = filename.split('.');

  return {
    name: parts[0],
    extension: parts[1]
  };
}

export function getFileExtension(file) {
  return file.split('.').pop();
}

export function getFileSize(file, sizeType) {
  const dir = path.join(__dirname, `../../public/${file}`);
  const stats = fs.statSync(dir);
  const bytes = stats.size;
  const k = 1000;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (bytes === 0) {
    return '0 Bytes';
  }

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
