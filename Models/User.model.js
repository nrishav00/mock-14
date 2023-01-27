const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    user_name:String,
    user_score:Number
});
const puzzUserModel=mongoose.model("puzzuser",UserSchema);
module.exports=puzzUserModel;