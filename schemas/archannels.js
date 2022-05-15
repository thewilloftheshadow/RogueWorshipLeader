const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  channel: {type: String}, // channel id
  disabled: {type: Boolean, default: true}, // if channel is enabled
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
