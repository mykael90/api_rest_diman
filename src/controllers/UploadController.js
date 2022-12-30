// import Sequelize from 'sequelize';
import sharp from 'sharp'; // manage images
import fs from 'fs';
import { resolve } from 'path';

import { random_5 } from '../asset/script/getRandomNumber';

const uploadPath = {
  worker: resolve(__dirname, '..', '..', 'uploads', 'workers', 'images'),
  materialIn: resolve(__dirname, '..', '..', 'uploads', 'materials', 'in', 'images'),
};

class UploadController {
  // Store Upload
  async storeWorker(req, res) {
    try {
      const { fileName, dimensionResized } = req;

      req.file.buffer = await sharp(req.file.buffer)
        .resize(dimensionResized, dimensionResized, {
          fit: 'inside', // both sides must be lower than 'dimensionResized'
          // eslint-disable-next-line max-len
          withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
        })
        .withMetadata()
        .toBuffer();

      fs.writeFileSync(`${uploadPath.worker}/${fileName}`, req.file.buffer);
      console.log('file uploaded');
      return res.json({ ...req.result, ...req.file });
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store Upload
  async storeMaterialIn(req, res) {
    try {
      // const { fileName, dimensionResized } = req;

      const dimensionResized = 800;

      console.log(req.files);

      // eslint-disable-next-line no-return-assign
      req.files.forEach((file) => file.newName = `${random_5()}_${file.originalname}`);

      // RESIZE WITH SHARP
      await Promise.all(req.files.map(async (file) => {
        file.buffer = await sharp(file.buffer)
          .resize(dimensionResized, dimensionResized, {
            fit: 'inside', // both sides must be lower than 'dimensionResized'
            // eslint-disable-next-line max-len
            withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
          })
          .withMetadata()
          .toBuffer();
      }));

      // SAVE FILES IN PATH
      await Promise.all(req.files.map(async (file) => {
        // const fileName = random_5();
        fs.writeFileSync(`${uploadPath.materialIn}/${file.newName}`, file.buffer);
        console.log('file uploaded');
      }));

      return res.json({ ...req.files });
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new UploadController();
