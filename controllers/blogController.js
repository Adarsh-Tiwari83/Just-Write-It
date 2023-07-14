const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController= async(req,res)=>{
    try{
        const blogs=await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'no blog found',
                
            })
        }
        res.status(200).send({
            success:true,
            message:'got all blogs',
            blogCount:blogs.length,
            blogs
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in get all blogs api',
            error
        })
    }
}
exports.createBlogController = async(req,res)=>{
    try{
        const {title,description,image}=req.body;
        if(!title || !description || !image){
            return res.status(400).send({
                success:false,
                message:'provide all fields',
            })
        }
        const existingUser = await userModel.findById(req.user._id);
        if(!existingUser){
            return res.status(400).send({
                success:false,
                message:'couldnt find user',
              })
        }
        const newBlog=new blogModel({title,description,image,user:req.user._id});
        await newBlog.save();
        existingUser.blogs.push(newBlog._id);
        await existingUser.save();
        res.status(200).send({
            success:true,
            message:'blog created successfully',
            newBlog
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in create blog api',
            error
        })
    }
}
exports.updateBlogController= async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,image}=req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        res.status(200).send({
            success:true,
            message:'blog updated successfully',
            blog
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in update blog api',
            error
        })
    }
}
exports.deleteBlogController = async(req,res)=>{
    try{
        const blog=await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
            message:'deleted blog successfully',
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in delete blog api',
            error
        })
    }
}
exports.getBlogByIdController = async(req,res)=>{
    try{
        const {id}=req.params;
        const blog=await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'blog not found',
            })
        }
        res.status(200).send({
            success:true,
            message:'got the blog',
            blog
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in get single blog api',
            error
        })
    }
}
exports.userBlogController=async(req,res)=>{
    try{
        const userBlog=await userModel.findById(req.params.id).populate('blogs');
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blog not found with this id',
              })
        }
        return res.status(200).send({
            success:true,
            message:'user blogs',
            userBlog
          })
    }catch(error){
      return res.status(400).send({
        success:false,
        message:'error in user blog api',
        error
      })
    }
  }