'use strict';


let _ = require("lodash"),
    config = process.config.global_config,
    UserRegisterModal = require('../models/userRegister')

let verifyUserByIdToken = async (req, res, next) => {
    let token = req.headers.token
    if (!token) {
        return res.json({
            status: 400,
            data: { msg: "You are not authorized." }
        });

    }
    let user = await UserRegisterModal
        .findOne({ fpToken: token })
        .select()
        .lean()
        .exec();
    if (!user) {
        return res.json({
            status: 400,
            data: { msg: "You are not authorized." }
        })
    } else {
        if (user) {
            req.user = {
                _id: user._id,
                email: user.email
            };
        }
        next();
    }
}


module.exports = {
    verifyUserByIdToken
}