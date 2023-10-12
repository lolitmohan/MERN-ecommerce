const mongoose=require('mongoose');
const CartModel=require('../model/CartModel');
const ProductModel = require('../model/ProductModel');

const CreateCart=async(req,res)=>{
    try{
        let user_id=req.headers.id;
        let reqBody=req.body;
        let productID=reqBody.productID;

        //Price Calculation
        let product= await ProductModel.findOne({_id:productID})
        let price=product.price;

        if(product.discount){
            price=product.discountPrice;
        }
        let totalPrice=price*reqBody.qty;


        reqBody.userID=user_id;
        reqBody.price= totalPrice;

        await CartModel.updateOne(
            {
            userID:user_id,
            productID:reqBody.productID},
            {$set:reqBody},
            {upsert:true},  
        );
        return {status:"Success", message:"Create Cart"}
    }
    catch(e){
        return {status:"fail", message:'Something went wrong'}
    }
}

const RemoveCart=async(req)=>{
    try{
        let user_id=req.headers.id;
        let reqBody=req.body;
        reqBody.userID=user_id;

        await CartModel.deleteOne({userID:user_id, productID:reqBody.productID})
      return {status:"Success", message:"Cart Item Deleted"}
    } 
    catch(e){
        return {status:"Fail", message:"Something went wrong"}
    }
}


const Cart=async(req)=>{
    try{
        let user_id=new ObjectId(req.headers.id);

        let matchStage={$match:{userID:user_id}}
        let JoinStageProduct={$lookup: {from: 'products', localField:'productId',foreignField:"_id", ass:'product'}}
        let unwindProductStage={$unwind: "$product"}

        let JoinStageBrand={$lookup: {from: 'brands', localField:'product.brandID',foreignField:"_id", ass:'brand'}}
        let unwindBrandStage={$unwind: "$brand"}

        let JoinStageCategory={$lookup: {from: 'categories', localField:'productId.categoryID',foreignField:"_id", ass:'categori'}}
        let unwindCategoryStage={$unwind: "$category"}

        let projectionStage ={$project: 
            {
                '_id':0,
                'userID':0,
                'updatedAt':0,
                'createdAt':0,
                'product._id':0,
                'product.categoryID':0,
                'product.brandID':0,
                'brand._id':0,
                'category._id':0,

            }}

            let data= await CartModel.aggregate([
                matchStage,
                JoinStageBrand,
                unwindBrandStage,
                JoinStageProduct,
                unwindProductStage,
                JoinStageCategory,
                unwindCategoryStage,
                projectionStage
            ])

            return {status:"Success", data:data}

    }
    catch(e){
        return {status:"Fail", message:"Something went wrong"}
    }
}


module.exports={CreateCart, RemoveCart, Cart};
