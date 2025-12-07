const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: String,
  ownerId: String,
  artworks: [String],
  exhibitions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collection", CollectionSchema);
