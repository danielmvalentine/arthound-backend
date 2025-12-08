const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  authorId: { type: String, required: true },
  targetType: { 
    type: String, 
    required: true,
    enum: ['artwork', 'artworks', 'exhibition', 'exhibitions']
  },
  targetId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteSchema);