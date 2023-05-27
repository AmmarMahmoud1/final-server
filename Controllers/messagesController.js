const messageModel = require("../Models/message");
const jwt = require('jsonwebtoken');
 const addMessage = async (req, res, next) => {

  const token = req.cookies.token;
  let decoded = jwt.verify(token, 'Ammar221');
   req.userId = decoded.userId;
   console.log(req.userId)
    try {
        const {message} = req.body;
        const data = await messageModel.create({
            message:{
                text: message
            },
            senderId:req.userId,
            receiverId: req.body.receiverId,
            postId: req.body.postId
        });

        if(data) return res.json({
            msg: "Message added successfully!"
        });
        return res.json({ 
            msg: "Failed to add message to DB"
        });

    } catch (err) {
        next(err);
    }
};



const getAllMessage = async (req, res) => {
    

    const token = req.cookies.token;
  let decoded = jwt.verify(token, 'Ammar221');
   req.userId = decoded.userId;

    const messages = await   messageModel.find({}).catch(err => res.status(500).send('Server Error'))
     res.status(200).json(messages);

   
    
};

module.exports.getChat = async (req,res) =>{
    const id = req.params.id

    const chat = await messageModel.findById({postId:id}).catch(err => console.log(err))
    res.json(chat)
}

module.exports = {
    getAllMessage, addMessage
}