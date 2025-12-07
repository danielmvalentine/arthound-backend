const Note = require("./notes.model");
const { allowRole } = require("../middleware/roles");

// CREATE NOTE
exports.create = async (req, res) => {
  const { text, targetType, targetId } = req.body;

  const note = await Note.create({
    text,
    targetType,
    targetId,
    author: req.user.id
  });

  res.json(note);
};

// GET NOTES FOR A SPECIFIC ART ITEM
exports.getForTarget = async (req, res) => {
  const { type, id } = req.params;

  const notes = await Note.find({
    targetType: type,
    targetId: id
  }).populate("author", "username avatar");

  res.json(notes);
};

// DELETE (author or curator)
exports.delete = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ error: "Note not found" });

  if (req.user.id !== note.author.toString() && req.user.role !== "curator") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
