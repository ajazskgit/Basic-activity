const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
 
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

main().then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.listen(8080,(req,res)=>{
    console.log("8080 is listening to server");
})
app.get("/",(req,res)=>{
    res.send("yo app ready!!")
})

//show all chats
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})
//new chat form
app.get("/chats/new",(req,res)=>{
    res.render("form.ejs");
})
//add new chat in db

app.post("/chats",(req,res)=>{
    let {from, msg , to} = req.body;
    let newChat= new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at: new Date()
    });
    newChat.save().
    then((res)=>{
        console.log("success");
    }).catch((err)=>{console.log(err)});

    res.redirect("/chats");
})
//edit message
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("msg.ejs",{chat});
})

//update message
app.put("/chats/:id",  async (req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:msg});
    res.redirect("/chats");

})
//destroy method
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deletechat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})





