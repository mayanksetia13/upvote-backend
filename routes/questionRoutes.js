const express = require("express");

const router = express.Router();

const {
  getAllQuestions,
  postQuestion,
  upvoteQuestion,
} = require("../controllers/questionControllers");

// GET all questions
router.get("/", getAllQuestions);

// POST a question
router.post("/new-question", postQuestion);

// UPDATE vote question
router.put("/upvote:id", upvoteQuestion);

module.exports = router;
