const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { userService } = require('../services');


function validateUser(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "[email required]"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.password) {
        ErrorResponse.message = "[password required]"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

async function checkAuth(req, res, next) {
    //const token = req.headers['jwt-token'];
    const authCookies = req.headers['cookie'];
    if (!authCookies) {
        ErrorResponse.message = "[cookie not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    var cookiePattern = new RegExp('SessionID' + "=([^;]*)");
    // console.log(cookiePattern);
    var match = cookiePattern.exec(authCookies);
    //console.log(typeof(match));
    if (!match) {
        ErrorResponse.message = "[jwt-token not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    const token = match[1];

    //console.log(authCookie);
    // const authCookie=req.cookie.SessionId;
    //const token=req.headers['cookie'].split("=")[1];
    //console.log("mw:"+req.headers['cookie'].split("=")[1]);

    try {
        const res = await userService.isAuthenticated(token);
        if (res) {
            req.user = res;
            next();
        }
        if (!res) {
            throw error;
        }
    }
    catch (error) {
        // console.log(error);
        ErrorResponse.message = error
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
}

module.exports = {
    validateUser,
    checkAuth,
}