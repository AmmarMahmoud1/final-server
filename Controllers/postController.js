const cookieParser = require('cookie-parser')
const Post = require('../Models/post');
const User = require('../Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const getOffers = async (req, res) =>{
const posts = (await Post.find({postType:"Offer"}).catch(err => console.log(err)) );
console.log(posts)
res.status(200).json(posts);

}

const getSearch = async (req, res) =>{
  const posts = (await Post.find({postType:"Search"}).catch(err => console.log(err)) );
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

  let decoded = jwt.verify(token, 'Ammar221');
   req.userId = decoded.userId;
  console.log(req.userId);

  try {
    
    // const {postType, title, category, content, Address, zipCode , userId} = req.body;
    // const {userId} = decoded.userId;
    const newPost = await Post.create({
      postType: req.body.postType,
      title : req.body.title,
      category: req.body.category,
      content: req.body.content,
      Address: req.body.Address,
      zipCode: req.body.zipCode,
      userId: req.userId});
    return res.status(201).json(newPost)
  } catch (error) {
    next(error);
  }
}

const updatePost = async (req , res) =>{
 const post = await Post.findById(req.params.id);
 const token = req.cookies.token;
 console.log(req.cookies)
 let decoded = jwt.verify(token, 'Ammar221');
 req.userId = decoded.userId;
 if(!post) {
    res.status(400) 
    throw new Error("Post not found!..")
 }
 if(!req.userId){
    res.status(401) 
    throw new Error('User not found!...')
  }

  if (post.userId.toString() !== req.userId){
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
    const token = req.cookies.token;
    console.log(req.cookies)
   let decoded = jwt.verify(token, 'Ammar221');
    req.userId = decoded.userId;

    if(!post){
     res.status(400)
    throw new Error('Post not found!.. ')
  }
  if(!req.userId){
    res.status(401)
    throw new Error('User not found')
  }
  if(post.userId.toString() !== req.userId){
    res.status(401)
    throw new Error('User not authorized')
  }

  await post.deleteOne()

  res.status(200).json({ id: req.params.id })


}

module.exports = {
    getJobs, getOffers, getSearch, getServices, addPost, updatePost, deletePost
}
