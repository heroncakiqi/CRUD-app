const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../Model/User');

const { validateUser } = require('../validitaion');

// create new user
router.post('/user/create', validateUser, async (req, res) => {
  // check if there is a user with that email
  const isEmail = await User.findOne({ email: req.body.email });
  if (isEmail) return res.json({ status: 400, email: 'Email alredy exists' });
  const isUser = await User.findOne({ user: req.body.user });
  if (isUser) return res.json({ status: 400, user: 'User alredy exists' });
  // create a the new user object
  const user = new User({
    user: req.body.user,
    password: req.body.password,
    email: req.body.email
  });
  // encryp users password and save the user;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      if (err) throw err;
      user.password = hash;
      try {
        res.json(await user.save());
      } catch (error) {
        return res.json(error);
      }
    });
  });
});

// get all users 
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users)
});

// get a user by :id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id});
    if(!user) return res.json({error: "user not found!"});
    res.json(user)
  } catch(e) {
    res.json(e);
  }
});

// delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.params.id });
  } catch(error){
    return res.json({ success: false });
  }
  res.json({ success: true });
});


// edit user 
router.post('/user/:id/edit', validateUser, async (req, res) => {
  //find user to update
  const  user = await User.findOne({ id: req.params.id });
  // return error if user not found
  if(!user) return res.json({error: 'user not found!'});
  // compare passwords
  const userWithUpdates = req.body
  const isMatch = await bcrypt.compare(userWithUpdates.current, user.password);
  if(!isMatch) return res.json({status:400, password: 'wrong password'});
  // set hash and save user with updates
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(userWithUpdates.password, salt, async (err, hash) => {
        if (err) throw err;
        userWithUpdates.password = hash;
        try{
          const user = await User.findOneAndUpdate( {id: req.params.id}, {$set: userWithUpdates}, {new: true});
          res.json(user)
        }catch(err) {
          res.json(err);
        }
      });
    });
  
});

module.exports = router;