const WishModel=require('../model/WishModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CreateWish = async (req)=>{
    try{
        let user_id=req.headers.id;
        let reqBody=req.body;// Product ID
        reqBody.userID = user_id;
        await  WishModel.updateOne({userID: user_id, productID: reqBody.productID}, {$set:reqBody}, {upsert:true})
        return {status:"success", message:"Wish List Created"}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}



module.exports={CreateWish}