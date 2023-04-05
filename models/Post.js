import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    maxlength: 60
  },
  content:{
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  comments:[
    {
      type: new mongoose.Schema(
        {
          comment: {type: String, required: true},
          author: {type:String, required:true},
        },
        { timestamps: true}
      )
    }
  ],
  author:{
    type: String,
    required: true,
    maxlength: 100,
  }
},{timestamps: true})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
