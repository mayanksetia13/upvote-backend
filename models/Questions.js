const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    upvoteBy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
