import express from 'express';
import cors from 'cors';
const app = express();
import 'dotenv/config';
const port = process.env.PORT || 5000;
import userRouter from './routes/userRoutes' ;
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
