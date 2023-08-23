import Sequelize from 'sequelize';
import { extname } from 'path';
import { random_5 } from '../asset/script/getRandomNumber';
import Worker from '../models/Worker';
import Car from '../models/Car';
import Cartype from '../models/Cartype';
import CarOccurrence from '../models/CarOccurrence';
import CarOccurrencetypes from '../models/CarOccurrencetypes';
import CarOccurrencePhoto from '../models/CarOccurrencePhoto';

class CarOccurrenceController {
  // Index

  async index(req, res) {
    try {
      const result = await CarOccurrence.findAll({
        include: [CarOccurrencetypes, CarOccurrencePhoto, Worker, {
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
        req.body.CarOccurrencePhotos = [];

        // POVOANDO O ARRAY DOS ARQUIVOS
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in req.files) {
          const fileExtension = extname(req.files[i].originalname);
          req.files[i].newName = `${Date.now()}_${random_5()}${fileExtension}`;
          req.body.CarOccurrencePhotos.push({
            filename: req.files[i].newName,
            originalName: req.files[i].originalname,
            order: Number(i) + 1,
          });
        }
      }

      const carOccurrence = await CarOccurrence.create(req.body, {
        include: [CarOccurrencePhoto],
      });

      if (req.files) {
        req.result = carOccurrence;
        return next(); // go to uploadController
      }

      return res.json(carOccurrence);
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

      const car = await CarOccurrence.findByPk(id);

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

export default new CarOccurrenceController();
