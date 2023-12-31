'use strict';

class UnauthorizedError extends Error {
    constructor(message, extra) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'Unauthorized';
        this.message = message || 'Unauthorized.';
        this.json = {
            error: this.message
        };
        this.status = 401;
        if (extra) {
            this.extra = extra;
        }
    }
}

module.exports = UnauthorizedError;
