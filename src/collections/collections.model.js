const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  artworks: [String],
  exhibitions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collection", CollectionSchema);
