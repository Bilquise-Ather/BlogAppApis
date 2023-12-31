'use strict';

let _ = require('lodash');

class BadRequestError extends Error {
    constructor(message, extra) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'BadRequest';
        this.message = message;
        this.json = _.isObject(message) ? message : { error: message };
        this.status = 400;
        if (extra) {
            this.extra = extra;
        }
    }
}

module.exports = BadRequestError;
