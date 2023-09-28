const {
  getProfileMiddleware,
} = require('./infra/middleware/get-profile.middleware');

const {
  sequelize,
  Profile: profileModel,
  Contract: contractModel,
  Job: jobModel,
} = require('./infra/database/sequelize');

const ProfileService = require('./infra/services/profile.service');

const AdminService = require('./infra/services/admin.service');
const AdminController = require('./app/admin.controller');
const AdminRouter = require('./interface/admin.router');

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

const jobService = new JobService({
  sequelize,
  jobModel,
  contractModel,
  profileModel,
});
const jobController = new JobController(jobService);
const jobRoutesInstance = new JobRouter(jobController, getProfile);
const jobRoutes = jobRoutesInstance.getRoutes();

const adminService = new AdminService({ sequelize, profileModel, jobService });
const adminController = new AdminController(adminService);
const adminRoutesInstance = new AdminRouter(adminController, getProfile);
const adminRoutes = adminRoutesInstance.getRoutes();

const routes = {
  contractRoutes,
  jobRoutes,
  adminRoutes,
};

module.exports = routes;
