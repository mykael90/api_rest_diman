import Sequelize, { Op } from 'sequelize';
import CarAccessory from '../models/CarAccessory';
import CarAccessorytype from '../models/CarAccessorytype';

class CarAccessoryController {
  // Index
  async index(req, res) {
    try {
      const result = await CarAccessory.findAll({
        include: [CarAccessorytype],
      });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // async store(req, res) {
  //   try {
  //     const accessory = await CarAccessory.create(req.body);
  //     return res.json(accessory);
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: [e.message],
  //     });
  //   }
  // }

  // Store Bulk (multiple items)
  async store(req, res) {
    try {
      console.log(req.body);
      const data = await CarAccessory.bulkCreate(req.body, {
        updateOnDuplicate: ['dimension', 'payload', 'obs'],
      });
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { CarId, CarAccessorytypeId } = req.params;

      if (!CarId || !CarAccessorytypeId) { // verificação se id foi enviado
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const accessory = await CarAccessory.findByPk(CarId);

      if (!accessory) {
        return res.status(400).json({
          errors: ['ID não existe'],
        });
      }

      const newData = await CarAccessory.update(req.body, {
        where: {
          car_id: CarId,
          car_accessory_type_id: CarAccessorytypeId,
        },
        limit: 1,
      });
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({
          errors: 'Parâmetros não enviados',
        });
      }

      console.log(req.body);

      const carAccessory = req.body.map((item) => ({
        [Op.and]: [
          { car_id: item.CarId },
          // { car_accessory_type_id: item.CarAccessorytypeId },
        ],
      }));

      console.log(carAccessory);

      const response = await CarAccessory.destroy({
        where: {
          [Op.or]: carAccessory,
        },
      });

      if (!response) {
        return res.status(400).json({
          errors: 'Parâmetro(s) de id(s) não localizado(s) no banco',
        });
      }

      return res.json(null);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CarAccessoryController();
