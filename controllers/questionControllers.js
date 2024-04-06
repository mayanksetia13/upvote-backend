const Question = require("../models/Questions");
const socket = require("../index");

const mongoose = require("mongoose");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ upvote: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cannot get All Questions", error: error.message });
  }
};

const postQuestion = async (req, res) => {
  try {
    const { question, name } = req.body;
    const postedQuestion = await Question.create({ question, name, upvote: 1 });
    socket.io.emit("newQuestion");
    res
      .status(200)
      .json({ message: "Question Added Successfully", postedQuestion });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Question not added", error: error.message });
  }
};

const upvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // const findQuestion = await Question.findById({ _id: id });

    // // person posting question can only vote once
    // if (findQuestion.upvoteBy.includes(id)) {
    //   console.log("true");
    //   return res
    //     .status(200)
    //     .json({ message: "User has already upvoted this Question" });
    // }

    const question = await Question.findByIdAndUpdate(
      { _id: id },
      { $inc: { upvote: 1 } },
      { new: true }
    );

    socket.io.emit("upvote", { id: id, upvote: question.upvote });
    res.status(200).json({ message: "Upvote by 1", question });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Upvote Failed", error: error.message });
  }
};

module.exports = { getAllQuestions, postQuestion, upvoteQuestion };
