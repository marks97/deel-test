class ProfileService {
  constructor(profileModel) {
    this.profileModel = profileModel;
  }

  async getProfileById(id) {
    return this.profileModel.findOne({ where: { id } });
  }
}

module.exports = ProfileService;
