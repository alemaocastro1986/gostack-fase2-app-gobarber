import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = resolve(__dirname, '..', '..', '..', '..', 'tmp');

export default {
  tempFolder,
  uploadsFolder: resolve(tempFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};