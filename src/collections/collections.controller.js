const Collection = require("./collections.model");

exports.create = async (req, res) => {
  const { name, artworks, exhibitions } = req.body;

  const collection = await Collection.create({
    name,
    artworks,
    exhibitions,
    owner: req.user.id
  });

  res.json(collection);
};

exports.getMine = async (req, res) => {
  const collections = await Collection.find({ owner: req.user.id });
  res.json(collections);
};

exports.getByUser = async (req, res) => {
  const collections = await Collection.find({ owner: req.params.id });
  res.json(collections);
};

exports.update = async (req, res) => {
  const collection = await Collection.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json(collection);
};

exports.delete = async (req, res) => {
  await Collection.deleteOne({ _id: req.params.id, owner: req.user.id });
  res.json({ success: true });
};
