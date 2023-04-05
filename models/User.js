import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName:{
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps: true})

export default mongoose.models.User || mongoose.model('User', UserSchema)