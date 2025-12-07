const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  authorId: String, 
  text: String,
  targetType: { type: String, enum: ["artwork", "exhibition"] },
  targetId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", NoteSchema);
