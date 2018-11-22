

exports.validateUser = (req, res, next) => {
  const errors = {};
  if(!req.body.user) {
    errors.user = 'you must provide a username!'
  }
  if(!req.body.password) {
    errors.password = 'you must provide a password!'
  }
  if(!req.body.email) {
    errors.email = 'you must provide an email!'
  }
  return isEmpty(errors) ? next() : res.json(errors);
}


function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}