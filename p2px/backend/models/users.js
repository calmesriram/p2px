var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  phone: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true
  },
  keys: {//walletAddress
    publicKey: String,
    privateKey: String,
  },
  images: {//walletAddress
    type: String,
    // unique: String,
  },
  hash: String,
  salt: String
},
  {
    timestamps: true
  });

var profileSchema = new mongoose.Schema({
  subdomain: { type: mongoose.Schema.ObjectId, ref: 'userSchema' }
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
mongoose.model('UserProfile', profileSchema);