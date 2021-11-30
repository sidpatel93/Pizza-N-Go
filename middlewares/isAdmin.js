const isAdmin = (req, res, next) => {

  if(req.isAuthenticated() && req.user.isadmin) {
    return next()
  }
  return res.redirect('/')

}

module.exports = isAdmin