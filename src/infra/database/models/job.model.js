const Sequelize = require('sequelize');

class JobModel extends Sequelize.Model {
  static get attributes() {
    return {
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
    };
  }
}

module.exports = JobModel;
