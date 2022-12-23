import Unidade from '../models/Unidade';
import MaterialIn from '../models/MaterialIn';

class UnidadeController {
  // Index

  async index(req, res) {
    try {
      const unidades = await Unidade.findAll(
        {
          include: [{
            model: MaterialIn,
          }],
        },
      );
      return res.json(unidades);
    } catch (e) {
      return res.json({
        errors: [e.message],
      });
    }
  }
}

export default new UnidadeController();
