const Note = require("./notes.model");

// CREATE NOTE
exports.create = async (req, res) => {
  const { text, targetType, targetId, userId } = req.body;

  const note = await Note.create({
    text,
    targetType,
    targetId,
    authorId: userId
  });

  res.json(note);
};

// GET NOTES FOR A SPECIFIC ARTWORK/EXHIBITION
exports.getForTarget = async (req, res) => {
  const { type, id } = req.params;

  const notes = await Note.find({
    targetType: type,
    targetId: id
  });

  res.json(notes);
};

// DELETE NOTE
exports.delete = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ error: "Not found" });

  // Only delete if user is the owner
  if (note.authorId !== userId)
    return res.status(403).json({ error: "Unauthorized" });

  await Note.deleteOne({ _id: id });
  res.json({ success: true });
};
