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

  // Show

  async show(req, res) {
    try {
      const { subRip } = req.params;
      console.log('subRip', subRip);

      if (!subRip) {
        return res.status(400).json({
          errors: 'Parâmetro de id não enviado',
        });
      }

      const building = await BuildingSipac.findAll({
        where: {
          sub_rip: subRip,
        },
        limit: 1,
      });

      if (!building) {
        return res.status(400).json({
          errors:
            'Parâmetro de id de instalação física não localizado no banco',
        });
      }

      return res.json(building);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  // Update

  async update(req, res) {
    try {
      const { subRip } = req.params;
      console.log('subRip', subRip);

      if (!subRip) {
        return res.status(400).json({
          errors: 'Parâmetro de id não enviado',
        });
      }

      const building = await BuildingSipac.findAll({
        where: {
          sub_rip: subRip,
        },
        limit: 1,
      });

      console.log(JSON.stringify(building));

      if (!building) {
        return res.status(400).json({
          errors:
            'Parâmetro de id de instalação física não localizado no banco',
        });
      }

      const newData = await BuildingSipac.update(req.body, {
        where: {
          subRip,
        },
        limit: 1,
      });
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new BuldingSipacController();
