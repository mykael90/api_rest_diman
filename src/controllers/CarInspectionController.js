import Sequelize from 'sequelize';
import { extname } from 'path';
import Car from '../models/Car';
import Cartype from '../models/Cartype';
import CarInspection from '../models/CarInspection';
import CarInspectionPhoto from '../models/CarInspectionPhoto';
import Worker from '../models/Worker';
import { random_5 } from '../asset/script/getRandomNumber';

class CarInspectionController {
  // Index

  async index(req, res) {
    try {
      const result = await CarInspection.findAll({
        include: [CarInspectionPhoto, Worker, {
          model: Car,
          // required: true,
          include: [Cartype],
        }],
      });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store
  async store(req, res, next) {
    try {
      if (req.files) {
        // If has file --->
        req.body.CarInspectionPhotos = [];

        // POVOANDO O ARRAY DOS ARQUIVOS
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in req.files) {
          const fileExtension = extname(req.files[i].originalname);
          req.files[i].newName = `${Date.now()}_${random_5()}${fileExtension}`;
          req.body.CarInspectionPhotos.push({
            filename: req.files[i].newName,
            originalName: req.files[i].originalname,
            order: Number(i) + 1,
          });
        }
      }

      const carInspection = await CarInspection.create(req.body, {
        include: [CarInspectionPhoto],
      });

      if (req.files) {
        req.result = carInspection;
        return next(); // go to uploadController
      }

      return res.json(carInspection);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) { // verificação se id foi enviado
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const car = await CarInspection.findByPk(id);

      if (!car) {
        return res.status(400).json({
          errors: ['ID não existe'],
        });
      }

      const newData = await car.update(req.body);
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CarInspectionController();
