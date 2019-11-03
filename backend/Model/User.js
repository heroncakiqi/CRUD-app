const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  id: {
    type: String,
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address']
  }
});

UserSchema.pre('save', async function(next) {
  try{
    await getId(this, next);
  }catch(err) {
    console.log(err);
  }
});

async function getId(user, cb) {
  const id = Math.floor(Math.random() * (9999 - 0));
  user.id = id.toString();
  const userWithId = await user.constructor.findOne({id: id});
  if(userWithId.length) {
   await getId(user, cb);
  }else{
    cb();
  }
}

module.exports =  mongoose.model("User", UserSchema);