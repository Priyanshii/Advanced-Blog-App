import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";

export default async function handler(req, res){
  await dbConnect();
  
  const { method } = req;

  if(method === "GET"){
    try{
      const posts = await Post.find();
      res.status(200).json(posts)
    }
    catch(err){
      res.status(500).json(err);
    }
  }
  if(method === "POST"){
    try{
      const post = await Post.create(req.body);
      res.status(201).json(post);
    }
    catch(err){
      res.status(500).json(err);
    }
  }
}