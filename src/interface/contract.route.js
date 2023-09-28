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

    this.router.get(
      '',
      this.getProfileMiddleware,
      this.getActiveContracts.bind(this),
    );
  }

  async getContractById(req, res, next) {
    try {
      const { id: contractId } = req.params;
      const { profile } = req;
      const contractRes = await this.contractController.getContractById({
        profile,
        contractId,
      });
      res.status(200).json(contractRes);
    } catch (error) {
      next(error);
    }
  }

  async getActiveContracts(req, res, next) {
    try {
      const { profile } = req;
      const contractRes = await this.contractController.getActiveContracts({
        profile,
      });
      res.status(200).json(contractRes);
    } catch (error) {
      next(error);
    }
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = ContractRouter;
