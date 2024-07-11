const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
main().then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats = [
    {from:"Ajaz1",
        to:"Niraj1",
        msg:"where r u bro1",
        created_at: new Date()},
    {from:"Ajaz2",
        to:"Niraj2",
        msg:"where r u bro2",
        created_at: new Date()},
    {from:"Ajaz3",
        to:"Niraj3",
        msg:"where r u bro3",
        created_at: new Date()},
    {from:"Ajaz4",
        to:"Niraj4",
        msg:"where r u bro4",
        created_at: new Date()},
    {from:"Ajaz5",
        to:"Niraj5",
        msg:"where r u bro5",
        created_at: new Date()}
];
Chat.insertMany(allChats);

    
























