const express = require('express');

class AdminRouter {
  constructor(adminController) {
    this.adminController = adminController;
    this.router = express.Router();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/balances/deposit/:id', this.depositBalance.bind(this));
  }

  async depositBalance(req, res, next) {
    try {
      const { id: profileId } = req.params;
      const { balance } = req.body;
      const response = await this.adminController.depositBalance({
        profileId,
        balance,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = AdminRouter;
