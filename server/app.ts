import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';

const app = express();

//body parser
app.use(express.json({limit: '50mb'}));

//cookie parser
app.use(cookieParser());

//cors parser
app.use(cors({
    origin: process.env.origin
}));

//testing api
app.get('/test', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//unknown api
app.all("*", (req: Request, res: Response , next:  NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`)  as any;
    err.status = 404;
    next(err);
});

app.use(ErrorMiddleware);

//error handling middleware
export { app };