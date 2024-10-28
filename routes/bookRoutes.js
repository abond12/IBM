const express = require("express");
const {
  getAllBooks,
  getISBNBook,
  getNameBook,
  getAuthorbook,
  getReviewBook,
} = require("../controllers/bookController.js");

const routerBook = express.Router();

routerBook.get("/all", async (req, res) => {
  try {
    await getAllBooks((all) => {
      res.status(200).json(all);
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to find all books" });
  }
});
routerBook.get("/isbn/:ISBN", async (req, res) => {
  const ISBN = req.params.ISBN;
  try {
    const filterISBN = await getISBNBook(ISBN);
    res.status(200).json(filterISBN);
  } catch (error) {
    if (error === "Book not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by number ISBN " });
  }
});

routerBook.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const fileteredName = await getNameBook(title);
    res.status(200).json(fileteredName);
  } catch (error) {
    if (error === "Book not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by title" });
  }
});

routerBook.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const fileteredAuthor = await getAuthorbook(author);
    res.status(200).json(fileteredAuthor);
  } catch (error) {
    if (error === "Author not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by title" });
  }
});

routerBook.get("/review/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const fileteredReview = await getReviewBook(title);
    res.status(200).json(fileteredReview);
  } catch (error) {
    if (error === "There are no reviews") {
      return res.status(404).send(error);
    }
    return res.status(400).json({ message: "Failed find review" });
  }
});

module.exports = routerBook;
