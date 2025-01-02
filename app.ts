import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';

const app = express();

//body parser
app.use(express.json({ limit: '50mb' }));

//cookie parser
app.use(cookieParser());

//cors parser
app.use(cors({
    origin: process.env.origin
}));

//routes
app.use('/api/v1', userRouter);
app.use('/api/v1', courseRouter);

//testing api
app.get('/test', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//unknown api
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.status = 404;
    next(err);
});

app.use(ErrorMiddleware);

//error handling middleware
export { app };