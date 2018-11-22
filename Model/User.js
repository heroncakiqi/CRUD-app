const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true
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
    const getId = async () => {
      const id = Math.floor(Math.random() * (9999 - 0));
      this.id = id.toString();
      const userWithId = await this.constructor.findOne({ id: id});
      if(userWithId.length) {
        getId();
      }else{
        next();
      }
  }
  getId();
});

module.exports =  mongoose.model("User", UserSchema);