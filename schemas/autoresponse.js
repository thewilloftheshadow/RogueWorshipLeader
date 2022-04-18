const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  trigger: { type: String }, // trigger of autoresponse
  response: { type: String }, // response to send
  createdAt: { type: Date, default: Date.now }, // time response was created
  createdBy: { type: String }, // mod who created autoresponse
  editedAt: { type: Date, default: Date.now }, // time response was edited
  editedBy: { type: String }, // mod who last edited autoresponse
  deleted: { type: Boolean, default: false }, // if autoresponse is deleted
  deletedBy: { type: String }, // mod who deleted autoresponse
  guild: { type: String } // guild id
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
