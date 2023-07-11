import express from 'express';
import mongoose from 'mongoose';


import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from '../models/Users.js';


const router = express.Router();

// accessing reviews
router.get("/",async(req,res)=>{

     try{
        const response = await ReviewModel.find({});
        res.json(response);


     } catch(err){
        res.json(err);
     }




})

// creating reviews
router.post("/",async(req,res)=>{
    const review = new ReviewModel(req.body)

    try{
       const response = await review.save();
       res.json(response);


    } catch(err){
       res.json(err);
    }
})



router.put("/",async(req,res)=>{
    const review = await ReviewModel.findById(req.body.reviewID);

    const user = await UserModel.findById(req.body.userID);


    try{
        const review = await ReviewModel.findById(req.body.reviewID);

        const user = await UserModel.findById(req.body.userID);
    
       user.savedReviews.push(review);
       await user.save();
       res.json({savedReviews : user.savedReviews});
       

    } catch(err){
       res.json(err);
    }
});


router.get("/savedReviews/ids/:userID",async (req,res)=>{

    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedReviews : user?.savedReviews});
        
    } catch (error) {
        res.json(err);
    }
});

router.get("/savedReviews",async (req,res)=>{

    try {
        const user = await UserModel.findById(req.body.userID);
        const savedReviews = await ReviewModel.find({
            _id : { $in : user.savedReviews },
        });


        res.json({savedReviews});
        
    } catch (error) {
        res.json(err);
    }
});






export { router as reviewsRouter};


