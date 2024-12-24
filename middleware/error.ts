import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = res.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongoose db error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong  jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Jsonwebtoken is invalid, try again';
        err = new ErrorHandler(message, 400);
    }

    //jwt expired error
    if (err.name === 'TokenExpiredError') {
        const message = 'Jsonwebtoken is  expired, try again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}