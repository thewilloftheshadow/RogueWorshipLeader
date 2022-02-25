const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  trigger: { type: String }, // trigger of autoresponse
  response: { type: String }, // response to send
  createdAt: { type: Date, default: Date.now }, // time response was created
  createdBy: { type: String, default: "en" }, // mod who created autoresponse
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
