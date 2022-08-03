import UserPositiontype from '../models/UserPositiontype';

class UserPositiontypeController {
  // Index

  async index(req, res) {
    try {
      const result = await UserPositiontype.findAll({ attributes: ['id', 'position', 'level'], order: [['position', 'ASC']] });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new UserPositiontypeController();
