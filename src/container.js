const {
  getProfileMiddleware,
} = require('./infra/middleware/get-profile.middleware');

const {
  Profile: profileModel,
  Contract: contractModel,
} = require('./infra/database/sequelize');

const ProfileService = require('./infra/services/profile.service');

const ContractService = require('./infra/services/contract.service');
const ContractController = require('./app/contract.controller');
const ContractRouter = require('./interface/contract.route');

// Instantiate dependencies
const profileService = new ProfileService(profileModel);
const getProfile = getProfileMiddleware(profileService);

const contractService = new ContractService(contractModel);
const contractController = new ContractController(contractService);
const contractRoutesInstance = new ContractRouter(
  contractController,
  getProfile,
);

const contractRoutes = contractRoutesInstance.getRoutes();

const routes = {
  contractRoutes,
};

module.exports = routes;
