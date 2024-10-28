const express = require("express");
const {
  checkAuth,
  register,
  checkSession,
} = require("../middlewares/checkAuth.js");
const { addReview, deleteReview, updateReview } = require("../controllers/authController.js");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", checkAuth);
router.post("/review/:title", checkSession, async (req, res) => {
  const title = req.params.title;
  const text = req.body.description;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  try {
    const response = await addReview(title, username, text);
    res
      .status(200)
      .json({ message: ` ${username}: Description sent successfully` });
  } catch (error) {
    if (error === "Book not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by title" });
  }
});
router.put("/update-review/:title", checkSession, async (req, res) => {
  const title = req.params.title;
  const text = req.body.description;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }
  try {
    const response = await updateReview(title, username, text);
    res.status(201).json(`${username}: description update successfully`);
  } catch (error) {
    if (error === "Book not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by title" });
  }
});

router.delete("/delete-review/:title", checkSession, async (req, res) => {
  const title = req.params.title;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }
  try {
    const response = await deleteReview(title, username);
    res.status(202).json(`${username}:  delete review successfully`);
  } catch (error) {
    if (error === "Book not found") {
      return res.status(404).send(error);
    }
    return res
      .status(400)
      .json({ message: "Failed to find the book by title" });
  }
});

module.exports = router;
