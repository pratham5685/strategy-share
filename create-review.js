import { useState } from "react"
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom"


export const CreateReview = () =>{
    const userID = useGetUserID();

     const [review,setReview]=useState({
        companyNRole:"",
        connect : "",
        imageUrl : "",
        difficulty :"",
        userOwner : userID,

        


     });

     

    const navigate  = useNavigate();


     const handleChange =(event)=>{
        const {name,value} = event.target;
        setReview({...review,[name]:value });

     };

    const onSubmit =  async (event) =>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/reviews",review);
            alert("Review Created");
            navigate("/");

        }catch(err){
            console.error(err);
        }

    }




    return<div className="create-recipe" >

        <h2> Create Review</h2>
        <form className="create-recipe form" onSubmit={onSubmit}>
     
        <label htmlFor="companyNRole">Company and Role </label>
          <input  type="text" id="name" name="companyNRole" onChange={handleChange}/>



          <label htmlFor="connect">Connect</label>
          <textarea id="connect" name="connect"onChange={handleChange} placeholder="You can add your preferable mode of connection such as instagram , linkedIn Profile link or even email"></textarea>

         
          
         


          



          <label htmlFor="content">content</label>
          <textarea id="instructions" name="content"onChange={handleChange}></textarea>


          <label htmlFor="imageUrl" >Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl"onChange={handleChange} />

          <label htmlFor="difficulty">Difficulty</label>
          <input type="number" id="cookingTime" name="difficulty" onChange={handleChange} />

          <button type="submit"> create new review </button>

        </form>
        
    </div>
}