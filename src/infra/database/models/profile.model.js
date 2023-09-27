const Sequelize = require('sequelize');

class ProfileModel extends Sequelize.Model {
  static get attributes() {
    return {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM('client', 'contractor'),
      },
    };
  }
}

module.exports = ProfileModel;
