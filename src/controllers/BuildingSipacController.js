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
                  '0',
                ),
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

  // Update

  async update(req, res) {
    try {
      const { subRip } = req.params;

      if (!subRip) {
        return res.status(400).json({
          errors: 'Parâmetro de id não enviado',
        });
      }

      const building = await BuildingSipac.findByPk(subRip);

      if (!building) {
        return res.status(400).json({
          errors: 'Parâmetro de id de aluno não localizado no banco',
        });
      }

      const newData = await building.update(req.body, {
        where: {
          subRip,
        },
      });
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new BuldingSipacController();
