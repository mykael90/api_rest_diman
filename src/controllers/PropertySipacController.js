import Sequelize from 'sequelize';
import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

class PropertySipacController {
  // Index

  async index(req, res) {
    try {
      console.log('OI AQUI');
      const properties = await PropertySipac.findAll({
        attributes: ['id', 'rip', 'nomeImovel', 'tipoImovel', 'municipio'],
        include: [
          {
            model: BuildingSipac,
            required: false,
            as: 'buildingsSipac',
            attributes: {
              include: [
                [
                  Sequelize.fn(
                    'CONCAT',
                    Sequelize.literal('`PropertySipac`.`rip`'),
                    '-',
                    Sequelize.fn(
                      'LPAD',
                      Sequelize.col('`buildingsSipac`.`id`'),
                      3,
                      '0'
                    )
                  ),
                  'sub-rip',
                ],
              ],
            },
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

export default new PropertySipacController();
