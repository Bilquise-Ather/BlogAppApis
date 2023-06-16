'use strict';
let mongoose = require("../helper/dojo"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    title: { type: String },
    body: { type: String },
    author: { type: String },
    user: { type: String },
    fpToken: { type: String },
    fpTokenCreatedAt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'blogs' });

let VIModel = mongoose.model("blogs", tempSchema);
module.exports = VIModel;
