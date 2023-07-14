const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController } = require('../controllers/blogController');

const router = express.Router();

router.get('/all-blogs',getAllBlogsController)
router.post('/create-blog',createBlogController)
router.put('/update-blog/:id',updateBlogController)
router.delete('/delete-blog/:id',deleteBlogController)

//get particular blog
router.get('/get-blog/:id',getBlogByIdController)

module.exports = router;