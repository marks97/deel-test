const express = require('express');

class ContractRouter {
  constructor(contractController, getProfileMiddleware) {
    this.contractController = contractController;
    this.getProfileMiddleware = getProfileMiddleware;
    this.router = express.Router();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      '/:id',
      this.getProfileMiddleware,
      this.getContractById.bind(this),
    );
  }

  getRoutes() {
    return this.router;
  }

  async getContractById(req, res, next) {
    try {
      const { id } = req.params;
      const contractRes = await this.contractController.getContractById(id);
      res.status(200).json(contractRes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContractRouter;
