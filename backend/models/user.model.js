import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   uuid:{
      type: String,
      required: true,
      unique: true, 
   },
   email:{
    type: String,
    required: true,
    unique: true
   }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;