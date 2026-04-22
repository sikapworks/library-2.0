const Book = require("../models/Book");

// CREATE
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// GET BY ID
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json(book);
  } catch {
    res.status(500).json({ error: "Error" });
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch {
    res.status(400).json({ error: "Update failed" });
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};

// SEARCH
exports.searchBooks = async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.find({
      title: { $regex: title, $options: "i" }
    });
    res.json(books);
  } catch {
    res.status(500).json({ error: "Search error" });
  }
};