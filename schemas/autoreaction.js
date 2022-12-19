const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  trigger: { type: String }, // trigger of autoreaction
  customEmojiId: { type: String }, // custom emoji to use
  unicodeEmoji: { type: String }, // unicode emoji to use
  createdAt: { type: Date, default: Date.now }, // time reaction was created
  createdBy: { type: String }, // mod who created autoreaction
  editedAt: { type: Date, default: Date.now }, // time reaction was edited
  editedBy: { type: String }, // mod who last edited autoreaction
  deleted: { type: Boolean, default: false }, // if autoreaction is deleted
  deletedBy: { type: String }, // mod who deleted autoreaction
  guild: { type: String } // guild id
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
