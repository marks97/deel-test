const ServerError = require('../infra/errors/server.error');
const NotFoundError = require('../infra/errors/not-found.error');
const { CONTRACT } = require('../domain/constants');

class ContractController {
  constructor(contractService) {
    this.contractService = contractService;
  }

  async getContractById({ profile, contractId }) {
    try {
      const contract = await this.contractService.getContractById({
        profile,
        contractId,
      });

      if (!contract) {
        throw new NotFoundError();
      }

      return {
        payload: contract,
      };
    } catch (error) {
      console.log('Error:', error);

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new ServerError();
    }
  }

  async getActiveContracts({ profile }) {
    try {
      const contract = await this.contractService.getContractsByStatus({
        profile,
        status: [CONTRACT.STATUS_NEW, CONTRACT.STATUS_IN_PROGRESS],
      });

      if (!contract) {
        throw new NotFoundError();
      }

      return {
        payload: contract,
      };
    } catch (error) {
      console.log('Error:', error);

      if (error instanceof NotFoundError) {
        throw new NotFoundError();
      }

      throw new ServerError();
    }
  }
}

module.exports = ContractController;
