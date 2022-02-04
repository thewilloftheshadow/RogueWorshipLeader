const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  user: { type: String }, // id of user
  flags: { type: Array, default: [] }, // flags of user
  date: { type: Date, default: Date.now }, // time they were created
  language: { type: String, default: "en" }, // language of user
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
