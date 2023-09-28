const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

const { Job, Profile, Contract } = require('./models');

// Init models
Job.init(Job.attributes, { sequelize, modelName: 'Job' });
Profile.init(Profile.attributes, { sequelize, modelName: 'Profile' });
Contract.init(Contract.attributes, { sequelize, modelName: 'Contract' });

// Init model dependencies
Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
