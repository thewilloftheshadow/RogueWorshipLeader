const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  user: { type: String }, // id of user
  flags: { type: Array, default: [] }, // flags of user
  date: { type: Date, default: Date.now }, // time they were created
  language: { type: String, default: "en" }, // language of user
  pingGif: { type: String }, // ping gif of user
  perms: {
    pinggif: { type: Boolean, default: false }, // can set their own ping gif
    facts: { type: Boolean, default: false }, // can add facts
    echo: { type: Boolean, default: false }, // can use the echo command
    autoresponse: { type: Boolean, default: false }, // can manage autoresponse
  }
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
