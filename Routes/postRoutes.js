
const express = require('express')
const cookieParser = require("cookie-parser")

const postRouter = express.Router();

const{
    getJobs, getOffers, getServices,getSearch, addPost, updatePost, deletePost
} = require('../Controllers/postController')

postRouter.use(cookieParser());

postRouter.route('/offers').get(getOffers)
postRouter.route('/search').get(getSearch)
postRouter.route('/services').get(getServices)
postRouter.route('/jobs').get(getJobs)
postRouter.route('/add').post(addPost)
postRouter.route('/:id').put(updatePost)
postRouter.route('/:id').delete(deletePost)


module.exports = postRouter;