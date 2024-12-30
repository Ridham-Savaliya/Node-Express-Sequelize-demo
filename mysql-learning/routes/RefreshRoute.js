const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User,ValidateModel} = require("../models/user");
const router = express.Router();

router.post('/refresh',(req,res)=>{
    try
    {

        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken)
        {
            return res.status(403).json({ error: "Refresh token missing!" });
        }

        // verifying the refresh token
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY,async (err,decoded)=>{
            if(err)
            {
                return res.status(403).json({err:"invalid token or expired token!"});
            }

            const user =  await User.findByPk(decoded.id);
            if(!user){
                return res.status(404).json({message:"user not found!"});
            }
            // Generates a new access token

           const newAccessToken = jwt.sign({id:user.userId},process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:'15m'})

           res.status(200).json({accessToken:newAccessToken});
        })
               
    }
    catch(error)
    {
        res.status(500).json({message:'failed to refresh the token',details:error.message});
    }
})


module.exports = router
