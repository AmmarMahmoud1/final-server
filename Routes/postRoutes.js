
const express = require('express')
const postRouter = express.Router();

const{
    getJobs, getPosts, getServices, addPost, updatePost, deletePost
} = require('../Controllers/postController')


postRouter.route('/').get(getPosts)
postRouter.route('/services').get(getServices)
postRouter.route('/jobs').get(getJobs)
postRouter.route('/add').post(addPost)
postRouter.route('/:id').put(updatePost)
postRouter.route('/:id').delete(deletePost)


module.exports = postRouter;