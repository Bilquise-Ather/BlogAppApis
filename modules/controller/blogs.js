'use strict';

let blogManager = require('../manager/blogs');

let blogs = (req, res, next) => {

    return blogManager
        .blogs(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getBlogs = (req, res, next) => {
    return blogManager
        .getBlogs(req.params._id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllBlogs = (req, res, next) => {
    return blogManager
        .getAllBlogs(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let deleteBlog = (req, res, next) => {
    return blogManager
        .deleteBlog(req.params._id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let updateBlog = (req, res, next) => {
    return blogManager
        .updateBlog(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let register = (req, res, next) => {

    return blogManager
        .register(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let login = (req, res, next) => {
    return blogManager
        .login(req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

let logOut = (req, res, next) => {
    console.log(req.user);
    return blogManager
        .logOut(req.user)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

module.exports = {
    blogs: blogs,
    getBlogs: getBlogs,
    getAllBlogs: getAllBlogs,
    deleteBlog: deleteBlog,
    updateBlog: updateBlog,
    register: register,
    login: login,
    logOut: logOut
};
