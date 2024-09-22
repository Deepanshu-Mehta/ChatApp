const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://mdeepanshu2706:YXrTmCMDjjK4h6p6@cluster0.l4iwl.mongodb.net").then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;