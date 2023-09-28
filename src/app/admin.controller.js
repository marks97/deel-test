const ServerError = require('../infra/errors/server.error');
const NotFoundError = require('../infra/errors/not-found.error');
const BaseError = require('../infra/errors/base.error');

class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  async depositBalance({ profileId, balance }) {
    try {
      await this.adminService.depositBalance({ profileId, balance });

      return {
        payload: {
          message: 'Balance deposited successfully',
        },
      };
    } catch (error) {
      console.log('Error:', error);

      if (error instanceof NotFoundError || error instanceof BaseError) {
        throw error;
      }

      throw new ServerError();
    }
  }

  async getBestProfession({ start, end }) {
    try {
      const profession = await this.adminService.getBestProfession({
        start,
        end,
      });

      return {
        payload: profession,
      };
    } catch (error) {
      console.log('Error:', error);

      throw new ServerError();
    }
  }
}

module.exports = AdminController;
