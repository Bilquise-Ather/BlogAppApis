'use strict';

const HTTP_STATUS = require('./modules/constants/httpStatus');

let express = require("express"),
    router = express.Router(),
    controller = require("./modules/controller/blogs"),
    authMiddleware = require("./modules/middleware/authValidation");

router.post('/blogs', controller.blogs);
router.get('/getBlogs/:_id', controller.getBlogs);
router.get('/getAllBlogs', controller.getAllBlogs);
router.delete('/deleteBlog/:_id', controller.deleteBlog);
router.post('/updateBlog', controller.updateBlog);

router.post('/register', controller.register);

router.post('/login', controller.login);
router.post('/logOut', authMiddleware.verifyUserByIdToken, controller.logOut);




module.exports = router

