var express=require("express");
var exe=require("./db");
const sendMsg = require("../mail_send");
var router=express.Router();
router.get("/",async function(req,res){
    var intro=await exe(`select * from introduction`);
    var edu=await exe(`select * from education`);
    var skill=await exe(`select * from skills`);
    var project=await exe(`select * from projects`);
    var obj={"intro":intro[0],"edu":edu,"skill":skill,"project":project};
    res.render("user/home.ejs",obj);
});
router.post("/send_msg",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var msg=req.body.message;
    sendMsg(name,email,msg)
});
module.exports=router;