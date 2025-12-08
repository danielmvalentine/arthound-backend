const Note = require("./notes.model");

// CREATE NOTE
exports.create = async (req, res) => {
  console.log("📝 Creating note with data:", req.body);
  
  try {
    const { text, targetType, targetId, userId } = req.body;
    
    // Validate required fields
    if (!text || !targetType || !targetId || !userId) {
      return res.status(400).json({ 
        error: "Missing required fields",
        required: ["text", "targetType", "targetId", "userId"]
      });
    }
    
    const note = await Note.create({
      text,
      targetType,
      targetId,
      authorId: userId
    });
    
    console.log("✅ Note created successfully:", note._id);
    res.json(note);
  } catch (error) {
    console.error("❌ Error creating note:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET NOTES FOR A SPECIFIC ARTWORK/EXHIBITION
exports.getForTarget = async (req, res) => {
  try {
    const { type, id } = req.params;
    console.log(`📖 Fetching notes for ${type}/${id}`);
    
    const notes = await Note.find({
      targetType: type,
      targetId: id
    }).sort({ createdAt: -1 }); // Newest first
    
    console.log(`✅ Found ${notes.length} notes`);
    res.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE NOTE
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    console.log(`🗑️ Deleting note ${id} by user ${userId}`);
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    // Only delete if user is the owner
    if (note.authorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    await Note.deleteOne({ _id: id });
    console.log("✅ Note deleted successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    res.status(500).json({ error: error.message });
  }
};