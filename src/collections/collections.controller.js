const Collection = require("./collections.model");

// CREATE
exports.create = async (req, res) => {
  const { name, artworks, exhibitions, userId } = req.body;

  const collection = await Collection.create({
    name,
    artworks,
    exhibitions,
    ownerId: userId
  });

  res.json(collection);
};

// GET USER'S COLLECTIONS
exports.getMine = async (req, res) => {
  const { userId } = req.query;
  const collections = await Collection.find({ ownerId: userId });
  res.json(collections);
};

// UPDATE
exports.update = async (req, res) => {
  const { name, artworks, exhibitions } = req.body;
  const { id } = req.params;

  const updated = await Collection.findByIdAndUpdate(
    id,
    { name, artworks, exhibitions },
    { new: true }
  );

  res.json(updated);
};

// DELETE
exports.delete = async (req, res) => {
  await Collection.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
