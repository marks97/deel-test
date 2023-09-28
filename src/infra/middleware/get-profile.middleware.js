const getProfileMiddleware = profileService => {
  return async (req, res, next) => {
    try {
      const profileId = req.get('profile_id') || 0;
      const profile = await profileService.getProfileById(profileId);

      if (!profile) {
        return res.status(401).send('Unauthorized');
      }

      req.profile = profile;

      return next();
    } catch (error) {
      console.error('Error fetching profile:', error);

      return next(error);
    }
  };
};

module.exports = {
  getProfileMiddleware,
};
