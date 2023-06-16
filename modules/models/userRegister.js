'use strict';
let mongoose = require("../helper/dojo"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    email: { type: String },
    userName: { type: String },
    password: { type: String },
    fpToken: { type: String },
    fpTokenCreatedAt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'user_register' });

let VIModel = mongoose.model("user_register", tempSchema);
module.exports = VIModel;
