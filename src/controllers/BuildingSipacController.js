import Sequelize from 'sequelize';
import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

class BuldingSipacController {
  // Index

  async index(req, res) {
    try {
      const properties = await BuildingSipac.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn(
                'CONCAT',
                Sequelize.literal('`PropertySipac`.`rip`'),
                '-',
                Sequelize.fn(
                  'LPAD',
                  Sequelize.col('`BuildingSipac`.`id`'),
                  3,
                  '0'
                )
              ),
              'sub-rip',
            ],
          ],
        },
        include: [
          {
            model: PropertySipac,
            required: false,
            attributes: [],
          },
        ],
      });
      return res.json(properties);
    } catch (e) {
      return res.json({
        errors: [e.message],
      });
    }
  }
}

export default new BuldingSipacController();
