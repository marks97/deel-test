const ServerError = require('../errors/server.error');
const { PROFILE } = require('../../domain/constants');

class ContractService {
  constructor(contractModel) {
    this.contractModel = contractModel;
  }

  async getContractById({ profile, contractId }) {
    const { type, id: profileId } = profile;

    if (type === PROFILE.CLIENT_TYPE) {
      return this.contractModel.findOne({
        where: { id: contractId, ClientId: profileId },
      });
    }

    if (type === PROFILE.CONTRACTOR_TYPE) {
      return this.contractModel.findOne({
        where: { id: contractId, ContractorId: profileId },
      });
    }

    console.log('Error: Invalid profile type');
    throw new ServerError();
  }
}

module.exports = ContractService;
