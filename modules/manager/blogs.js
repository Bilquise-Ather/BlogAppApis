'use strict';


let _ = require("lodash"),
    config = process.config.global_config,

    BlogsModel = require('../models/blogs'),

    UserRegisterModal = require('../models/userRegister'),

    BadRequestError = require('../errors/badRequestError'),

    ObjectId = require('mongoose').Types.ObjectId,

    validator = require('validator'),
    md5 = require('md5');


let blogs = async (req) => {
    let blogData;

    if (!req.body.title || !req.body.body || !req.body.author) {
        throw new BadRequestError('please fill all the details');
    }

    blogData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        user: req.body.userId
    }

    return await BlogsModel(blogData).save()
}

let getBlogs = async (_id) => {
    let findData = { _id: ObjectId(_id) };

    let allBlogs = await BlogsModel.aggregate([
        { $match: findData },

    ])
        .exec()
    return allBlogs;
}

let getAllBlogs = async (body) => {
    let allBlogsData = await BlogsModel.find()
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
    return allBlogsData;
}

let deleteBlog = async (_id) => {
    return await BlogsModel
        .deleteOne({ _id: ObjectId(_id) })
        .lean()
        .exec();
}

let updateBlog = async (req) => {

    updateData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    }

    updateData = await BlogsModel.updateOne({ _id: req.body._id }, { $set: updateData })

        .exec();
    return updateData[0];

}


let register = async (body) => {
    // ['email', 'password', 'userName'].forEach(x => {
    //     if (!body[x]) {
    //         throw new BadRequestError(x + " is required");
    //     }
    // });
    let findEmail = await UserRegisterModal.findOne({ email: body.email })
    if (findEmail) { throw new BadRequestError("Email Already Exists!") }
    let findUserName = await UserRegisterModal.findOne({ userName: body.userName })
    if (findUserName) { throw new BadRequestError("UserName Already Exists!") }
    let newUser = {
        email: body.email,
        userName: body.userName,
        password: md5(body.password),
    };
    return await UserRegisterModal(newUser).save()

}

let login = async (body) => {
    let userId;
    if (!body) {
        throw new BadRequestError('Request body comes empty');
    }

    ['email', 'password'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });

    if (!validator.isEmail(body.email)) {
        throw new BadRequestError("Email is invalid");
    }

    let user = await UserRegisterModal
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    if (!user) {
        throw new BadRequestError("Either username or password is invalid");
    }
    let accessToken = md5(Date.now() + body.email);
    if (user) {
        await UserRegisterModal
            .updateOne({ _id: user._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
            .exec();
        userId = user._id
    }
    return {
        userId: userId,
        accessToken: accessToken,
        user: user,
    };
}


let logOut = async (user) => {
    let upUser = await UserRegisterModal.updateOne({ _id: user._id }, { $set: { fpToken: ' ', fpTokenCreatedAt: new Date() } })
        .exec();
    return { msg: "logout success" };
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
}