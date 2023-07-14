const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController } = require('../controllers/blogController');
const { isAuthenticated } = require('../middlewares/auth');
const { userBlogController } = require('../controllers/blogController');

const router = express.Router();

router.get('/all-blogs',getAllBlogsController)
router.post('/create-blog',isAuthenticated,createBlogController)
router.put('/update-blog/:id',isAuthenticated,updateBlogController)
router.delete('/delete-blog/:id',isAuthenticated,deleteBlogController)

//get particular blog
router.get('/get-blog/:id',getBlogByIdController)
//user blog
router.get('/user-blog/:id',userBlogController)

module.exports = router;