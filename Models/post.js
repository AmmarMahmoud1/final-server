const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  category :{
    type: String,
   

  },
   postType :{
    type : String,

   },
  title: {
    type: String,
    
  },

  content: {
    type: String,
   
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
   

   
  },
  Address:{
    type: String
  },
  zipCode :{
    type: String,
    
  },
    image: {
      type: String
    
  
   },
   cloudinary_id: {
    type: String
   }

 
 
},
{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;