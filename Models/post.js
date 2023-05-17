const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  category :{
    type: String,
    required: true

  },
   postType :{
    type : String,
    required : true
   },
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
  },
  Address:{
    type: String
  },
  zipCode :{
    type: String,
    required :[true, 'Please add the zip code']
  },
  images : {
    type: String
  }
 
},
{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;