import Sequelize from 'sequelize';
import { extname } from 'path';
import Car from '../models/Car';
import CarFueltype from '../models/CarFueltype';
import CarOccurrence from '../models/CarOccurrence';
import Cartype from '../models/Cartype';
import CarPhoto from '../models/CarPhoto';
import { random_5 } from '../asset/script/getRandomNumber';
import CarInspection from '../models/CarInspection';
import CarAccessory from '../models/CarAccessory';
import CarAccessorytype from '../models/CarAccessorytype';
import CarStatus from '../models/CarStatus';
import CarStatustype from '../models/CarStatustype';

class CarController {
  // Index

  async index(req, res) {
    try {
      const result = await Car.findAll({
        include: [CarFueltype, Cartype, CarPhoto, CarOccurrence, CarInspection, {
          model: CarAccessory,
          // required: true,
          include: [CarAccessorytype],
        }, {
          model: CarStatus,
          // required: true,
          include: [CarStatustype],
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
        req.body.CarPhotos = [];

        // POVOANDO O ARRAY DOS ARQUIVOS
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in req.files) {
          const fileExtension = extname(req.files[i].originalname);
          req.files[i].newName = `${Date.now()}_${random_5()}${fileExtension}`;
          req.body.CarPhotos.push({
            filename: req.files[i].newName,
            originalName: req.files[i].originalname,
            order: Number(i) + 1,
          });
        }
      }
      const car = await Car.create(req.body, {
        include: [CarPhoto, CarAccessory, CarStatus],
      });
      if (req.files) {
        req.result = car;
        return next(); // go to uploadController
      }
      return res.json(car);
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

      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(400).json({
          errors: ['ID não existe'],
        });
      }

      const newData = await car.update(req.body, {
        include: [CarAccessory],
      });
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CarController();
