const { Sequelize } = require('sequelize');
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

  async getContractsByStatus({ profile, status }) {
    const { type, id: profileId } = profile;

    if (type === PROFILE.CLIENT_TYPE) {
      return this.contractModel.findAll({
        where: {
          ClientId: profileId,
          status: {
            [Sequelize.Op.in]: status,
          },
        },
      });
    }

    if (type === PROFILE.CONTRACTOR_TYPE) {
      return this.contractModel.findAll({
        where: {
          ContractorId: profileId,
          status: {
            [Sequelize.Op.in]: status,
          },
        },
      });
    }

    console.log('Error: Invalid profile type');
    throw new ServerError();
  }
}

module.exports = ContractService;
