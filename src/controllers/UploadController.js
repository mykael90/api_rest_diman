import Sequelize from 'sequelize';
import sharp from 'sharp'; // manage images
import fs from 'fs';
import { extname, resolve } from 'path';

const uploadPath = {
  worker: resolve(__dirname, '..', '..', 'uploads', 'workers', 'images'),
};

const uploadPrefix = {
  worker: 'worker_id_',
};

class UploadController {
  // Store Upload
  async storeWorker(req, res) {
    try {
      console.log('aqui');
      const fileName = `${uploadPrefix.worker}${req.result.id}`;
      const extFile = extname(req.file.originalname);

      req.file.buffer = await sharp(req.file.buffer)
        .resize(1200, 1200, {
          fit: 'inside', // both sides must be lower than 1200px
          // eslint-disable-next-line max-len
          withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
        }).toBuffer();

      fs.writeFileSync(`${uploadPath.worker}/${fileName}${extFile}`, req.file.buffer);
      console.log('file uploaded');
      return res.json({ ...req.result, ...req.file });
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new UploadController();
