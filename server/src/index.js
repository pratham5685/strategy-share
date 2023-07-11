import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js'
import {reviewsRouter} from './routes/reviews.js'

const app = express();

app.use(express.json());

app.use(cors());
app.use("/auth",userRouter);
app.use("/reviews",reviewsRouter);

mongoose.connect("mongodb+srv://pratham5685:Rekha1980@reviews.nqsi8o1.mongodb.net/reviews?retryWrites=true&w=majority")


app.listen(3001,()=>{
    console.log("SERVER STARTED!");
});
