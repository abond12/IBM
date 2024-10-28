const { books } = require("../config/db.js");

const getAllBooks = (callback) => {
  setTimeout(() => {
    callback(books);
  }, 1000);
};

const getISBNBook = (ISBN) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numISBN = Number(ISBN);

      const filtered_ISBN = books.filter((book) => book.ISBN === numISBN);

      if (filtered_ISBN.length > 0) {
        resolve(filtered_ISBN);
      } else {
        reject("Book not found");
      }
    }, 1000);
  });
};

const getNameBook = (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filterTitle = books.filter(
        (book) =>
          book.title.toLowerCase().replace(/\s+/g, "") === title.toLowerCase()
      );

      if (filterTitle.length > 0) {
        resolve(filterTitle);
      } else {
        reject("Book not found");
      }
    }, 1000);
  });
};

const getAuthorbook = (author) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filtered_author = books.filter(
        (book) =>
          book.author.toLowerCase().replace(/\s+/g, "") === author.toLowerCase()
      );

      if (filtered_author.length > 0) {
        resolve(filtered_author);
      } else {
        reject("Author not found");
      }
    }, 1000);
  });
};

const getReviewBook = (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredReview = books.filter((book) => (
        book.title.toLowerCase().replace(/\s+/g, "") === title.toLowerCase()
      ));

      if (filteredReview.review > 0) { 
        resolve(filteredReview.review);
      }else{
        reject("There are no reviews")
      }
    }, 1000);
  });
};

module.exports = { getAllBooks, getISBNBook, getNameBook, getAuthorbook, getReviewBook };
