const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel")

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
        const newBlog=new blogModel({title,description,image});
        await newBlog.save();
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