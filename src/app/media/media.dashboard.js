// Dependencies
import fs from 'fs';

// Utils
import { getFileInfo } from '../../lib/utils/files';
import { randomCode } from '../../lib/utils/security';

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
          const fileInfo = getFileInfo(filename);
          const name = `${fileInfo.name}-${randomCode(5)}`;
          const extension = fileInfo.extension;
          const filePath = `media/${name}.${extension}`;
          const url = `${__dirname}/../../public/${filePath}`;

          fstream = fs.createWriteStream(url);

          uploadedFiles.push({
            url: `${res.baseUrl}/${filePath}`,
            name: `${name}.${extension}`,
            extension
          });

          file.pipe(fstream);

          fstream.on('finish', () => {
            res.json(uploadedFiles);
          });
        });
      }
    });
  }
};
