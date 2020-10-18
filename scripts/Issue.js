const mongoose=require('mongoose');
const issueSchema= new mongoose.Schema({
    // _id:mongoose.ObjectId,
    status:String,
    owner:String,
    created: {
      type:Date,
      default:Date.now
    },
    Effort:Number,
    dueDate:{
      type:Date
    },
    title:String,
    description:String,
});

module.exports = mongoose.model("Issue",issueSchema);
