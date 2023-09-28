const {
  getProfileMiddleware,
} = require('./infra/middleware/get-profile.middleware');

const {
  Profile: profileModel,
  Contract: contractModel,
  Job: jobModel,
} = require('./infra/database/sequelize');

const ProfileService = require('./infra/services/profile.service');

const JobService = require('./infra/services/job.service');
const JobController = require('./app/job.controller');
const JobRouter = require('./interface/job.router');

const ContractService = require('./infra/services/contract.service');
const ContractController = require('./app/contract.controller');
const ContractRouter = require('./interface/contract.router');

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

const jobService = new JobService(jobModel, contractModel);
const jobController = new JobController(jobService);
const jobRoutesInstance = new JobRouter(jobController, getProfile);
const jobRoutes = jobRoutesInstance.getRoutes();

const routes = {
  contractRoutes,
  jobRoutes,
};

module.exports = routes;
