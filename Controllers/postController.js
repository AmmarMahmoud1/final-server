const cookieParser = require('cookie-parser')
const Post = require('../Models/post');
const User = require('../Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const getPosts = async (req, res) =>{
const posts = (await Post.find({postType:"Offer"}).catch(err => console.log(err)) );
console.log(posts)
res.status(200).json(posts);

}

const getServices = async (req, res ) =>{
  await Post.find({category: 'Services', postType:'Offer'}).catch(err => res.status(404).json({success : false,
    error: "Internal error during fetching services!"}));
}

const getJobs = async (req, res ) =>{
    await Post.find({category: 'Jobs', postType:'Offer'} )
    .catch(err => 
      res.status(404).json(
         {success : false,
               error: "Internal error during fetching services!"}));
  
  
  }





const addPost = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies)
  // const token = req.cookies.token;
  
  // if (!token) {
  //   return res.status(401).json({ message: 'Authentication required.' });
  // }
  
  // try {
  //   const decoded = jwt.verify(token, config.secretKey);
  //   req.userId = decoded.userId;


  const decoded = jwt.verify(token, 'Ammar221');
  req.userId = decoded.userId;
  console.log(req.userId);

  try {
    
    const {postType, title, category, content, Address, zipCode} = req.body;
    const {userId} = req.userId;
    console.log(userId + 'user id to DB')
    const newPost = await Post.create({postType, title, category, content, Address, zipCode, userId});
    return res.status(201).json(newPost)
  } catch (error) {
    next(error);
  }
}

const updatePost = async (req , res) =>{
 const post = await Post.findById(req.params.id);
 if(!post) {
    res.status(400) 
    throw new Error("Post not found!..")
 }
 if(!req.author){
    res.status(401) 
    throw new Error('User not found!...')
  }

  if (post.author.toString() !== req.author.id){
    res.status(401) 
    throw new Error('User not authorized!...')

 }  
 
 const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost);


}

const deletePost = async (req, res) =>{
    const post  = await Post.findById(req.params.id)

    if(!post){
     res.status(400)
    throw new Error('Post not found!.. ')
  }
  if(!req.author){
    res.status(401)
    throw new Error('User not found')
  }
  if(post.author.toString() !== req.author.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await post.remove()

  res.status(200).json({ id: req.params.id })


}

module.exports = {
    getJobs, getPosts, getServices, addPost, updatePost, deletePost
}
