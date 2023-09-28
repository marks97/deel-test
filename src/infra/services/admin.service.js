const BaseError = require('../errors/base.error');
const NotFoundError = require('../errors/not-found.error');

class AdminService {
  constructor({ sequelize, profileModel, jobService }) {
    this.sequelize = sequelize;
    this.profileModel = profileModel;
    this.jobService = jobService;
  }

  async depositBalance({ profileId, balance }) {
    const clientProfile = await this.profileModel.findOne({
      where: { id: profileId },
    });

    if (!clientProfile) {
      throw new NotFoundError();
    }

    const unpaidJobsSum = await this.jobService.getUnpaidJobSum({
      profileId,
    });

    const maxDepositAllowed = 0.25 * unpaidJobsSum;

    if (balance > maxDepositAllowed) {
      throw new BaseError(400, 'Deposit exceeds the limit.');
    }

    await clientProfile.increment({ balance });
  }
}

module.exports = AdminService;
