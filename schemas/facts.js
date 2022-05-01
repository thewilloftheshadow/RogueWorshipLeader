const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  category: { type: String }, // category of facts
  fact: { type: String }, // fact to send
  createdAt: { type: Date, default: Date.now }, // time fact was created
  createdBy: { type: String }, // mod who created fact
  editedAt: { type: Date, default: Date.now }, // time fact was edited
  editedBy: { type: String }, // mod who last edited fact
  deleted: { type: Boolean, default: false }, // if fact is deleted
  deletedBy: { type: String }, // mod who deleted fact
  guild: { type: String }, // guild id
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
