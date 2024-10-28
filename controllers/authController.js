const { books } = require("../config/db.js");

const addReview = (title, username, text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filterTitle = books.find(
        (book) =>
          book.title.toLowerCase().replace(/\s+/g, "") === title.toLowerCase()
      );

      if (filterTitle) {
        filterTitle.review.push({
          username: username,
          description: text,
        });
        resolve(filterTitle);
      } else {
        reject("Book not found");
      }
    }, 1000);
  });
};

const updateReview = (title, username, text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filterTitle = books.find(
        (book) =>
          book.title.toLowerCase().replace(/\s+/g, "") === title.toLowerCase()
      );
     

      if (filterTitle) {
        const review = filterTitle.review.find((review) => (
          review.username === username
        ));
        if (review) {
          review.description = text;
          resolve(` Your ${username} review updated`);
        } else {
          reject("Review not found for this user");
        }
      } else {
        reject("Book not found");
      }
    }, 1000);
  });
};

const deleteReview = (title, username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredBook = books.find((book) => {
        return (
          book.title.toLowerCase().replace(/\s+/g, "") === title.toLowerCase()
        );
      });

      if (filteredBook) {
        const reviewIndex = filteredBook.review.findIndex(
          (review) => review.username === username
        );

        if (reviewIndex !== -1) {
          filteredBook.review.splice(reviewIndex, 1);
          resolve({ message: "Review deleted successfully" });
        } else {
          reject("Review not found for this user");
        }
      } else {
        reject("Book not found");
      }
    }, 1000);
  });
};

module.exports = { addReview,updateReview, deleteReview };
