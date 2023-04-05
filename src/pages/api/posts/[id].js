import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";

export default async function handler(req, res){
  await dbConnect();
  
  const { method, query: {id} } = req;

  if(method === "GET"){
    try{
      const post = await Post.findById(id);
      res.status(200).json(post);
    }
    catch(err){
      res.status(500).json(err);
    }
  }
  if(method === "PUT"){
    try{
      const post = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(post);
    }
    catch(err){
      res.status(500).json(err);
    }
  }

  if(method === "DELETE"){
    try{
      await Post.findByIdAndDelete(id)
      res.status(200).json("The product has been deleted!");
    }
    catch(err){
      res.status(500).json(err);
    }
  }
}