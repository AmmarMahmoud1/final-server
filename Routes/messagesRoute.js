const { addMessage, getAllMessage } = require("../Controllers/messagesController");


const router = require("express").Router();

router.post("/addmsg", addMessage);
router.get("/all", getAllMessage);



module.exports = router;