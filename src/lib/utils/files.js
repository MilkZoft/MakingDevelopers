import fs from 'fs';
import { $baseUrl } from './../config';

export function glob(dir, _files, urls) {
  const files = fs.readdirSync(dir);
  let name;
  let tmp;
  let url;

  _files = _files || [];
  urls = urls || [];

  for (const i in files) {
    if (files[i] !== '.DS_Store' && files[i] !== '.gitkeep') {
      name = `${dir}/${files[i]}`;

      if (fs.statSync(name).isDirectory()) {
        glob(name, _files, urls);
      } else {
        tmp = name.split('/public/');

        if (isDefined(tmp[1])) {
          url = `${$baseUrl()}/${tmp[1]}`;

          _files.push(name);
          urls.push(url);
        }
      }
    }
  }

  return urls;
}
