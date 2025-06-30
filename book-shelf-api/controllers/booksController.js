const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

function readBooksFile() {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeBooksFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllBooks = (req, res) => {
  const books = readBooksFile();
  res.json(books);
};

exports.getBookById = (req, res) => {
  const books = readBooksFile();
  const book = books.find((b) => b.id === Number(req.params.id));
  if (book) res.json(book);
  else res.status(404).json({ message: "Book not found" });
};

exports.addBook = (req, res) => {
  const books = readBooksFile();
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeBooksFile(books);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  let books = readBooksFile();
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    writeBooksFile(books);
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.deleteBook = (req, res) => {
  let books = readBooksFile();
  const newBooks = books.filter((b) => b.id !== Number(req.params.id));
  if (newBooks.length === books.length) {
    return res.status(404).json({ message: "Book not found" });
  }
  writeBooksFile(newBooks);
  res.status(204).end();
};
