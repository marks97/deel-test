class ContractService {
  constructor(contractModel) {
    this.contractModel = contractModel;
  }

  async getContractById(id) {
    return this.contractModel.findOne({ where: { id } });
  }
}

module.exports = ContractService;
