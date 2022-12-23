import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

class PropertySipacController {
  // Index

  async index(req, res) {
    try {
      const properties = await PropertySipac.findAll(
        {
          attributes: ['id', 'rip', 'nomeImovel', 'tipoImovel', 'municipio'],
          include: [{
            model: BuildingSipac,
            required: false,
            as: 'buildingsSipac',
          }],
        },
      );
      return res.json(properties);
    } catch (e) {
      return res.json({
        errors: [e.message],
      });
    }
  }
}

export default new PropertySipacController();
