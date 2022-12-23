class HomeController {
  async index(req, res) {
    try {
      res.json('Index');
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }
}

export default new HomeController();
