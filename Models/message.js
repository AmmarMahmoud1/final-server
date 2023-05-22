const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    postId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);