const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
    rounds: 6
  }
})

userSchema.plugin(require('mongoose-bcrypt'))
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)