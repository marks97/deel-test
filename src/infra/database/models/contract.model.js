const Sequelize = require('sequelize');

class ContractModel extends Sequelize.Model {
  static get attributes() {
    return {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
      },
    };
  }
}
module.exports = ContractModel;
