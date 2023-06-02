const express = require("express");
const cookieParser = require("cookie-parser");

const postRouter = express.Router();

const {
  getJobs,
  getPosts,
  getServices,
  addPost,
  updatePost,
  deletePost,
  askPost,
} = require("../Controllers/postController");

const { checkAskPost } = require("../Middlewares/validateReq");

postRouter.use(cookieParser());

postRouter.route("/").get(getPosts);
postRouter.route("/services").get(getServices);
postRouter.route("/jobs").get(getJobs);
postRouter.route("/add").post(addPost);
postRouter.route("/:id").put(updatePost);
postRouter.route("/:id").delete(deletePost);
postRouter.route("/:id").post(checkAskPost, askPost);

module.exports = postRouter;
