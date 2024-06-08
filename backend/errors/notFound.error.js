const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFoundError extends BaseError {
    constructor(resourceName, resourceValue) {
        super(`NotFoundError`, StatusCodes.NOT_FOUND, {
            resourceName,
            resourceValue
        }, `The requested ${resourceName} is not found for ID ${resourceValue}`);
    }
}

module.exports = NotFoundError;