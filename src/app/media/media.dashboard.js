// Dependencies
import fs from 'fs';

// Utils
import { getFilename, getFileExtension } from '../../lib/utils/files';
import { md5 } from '../../lib/utils/security';

export default (req, res, next) => {
  // Methods
  res.mediaDashboard = {
    upload
  };

  return next();

  /**
   * Upload
   *
   * @returns {void} void
   */
  function upload() {
    res.profileAllowed(connectedUser => {
      if (res.isPost()) {
        let fstream;
        const uploadedFiles = [];

        req.pipe(req.busboy);

        req.busboy.on('file', (fieldname, file, filename) => {
          const name = md5(getFilename(filename));
          const extension = getFileExtension(filename);
          const filePath = `media/${name}.${extension}`;
          const url = `${__dirname}/../../public/${filePath}`;

          fstream = fs.createWriteStream(url);

          uploadedFiles.push({
            url: `${res.basePath}/${filePath}`,
            name,
            extension
          });

          file.pipe(fstream);

          fstream.on('finish', () => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(uploadedFiles));
          });
        });
      }
    });
  }
};
