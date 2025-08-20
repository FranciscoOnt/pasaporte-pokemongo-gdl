const validateAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.session.passport.user.isAdmin) {
    return next();
  }

  return res.status(401).send();
};

export default validateAdmin;
