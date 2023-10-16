const InvoicesModel=require('../model/InvoiceModel');
const mongoose=require('mongoose');
const ProductModel=require('../model/ProductModel');
const CartModel = require('../model/CartModel');
const ProfileModel = require('../model/ProfileModel');
const ObjectId=mongoose.Types.ObjectId;


const CalculateInvoice=async(req)=>{

    try{

        //Invoice Calculation
        let user_id=new ObjectId(req.headers.id);
        let data=await CartModel.aggregate([
            {$match:{userID:user_id}},
            {$group:{_id:0,total:{$sum: {$toDecimal:"$price"}}}}
        ]);



        let ayable=data[0].sum;
        let tran_id= Math.floor(100000000 + Math.random() * 900000000);
        let val_id=0;
        let delivery_status="pending";
        let ayment_status="pending";

        let Profile=await ProfileModel.aggregate([
            {$match:{userID:user_id}},
        ]);


        //Coustomar Shiping Details
        let cus_details=`Name: ${Profile[0].cus_name}, Email:${Profile[0].cus_email}, Address:${Profile[0].cus_add}, Phone:${Profile[0].cus_phone} `
        let ship_details=`Name: ${Profile[0].ship_name}, City:${Profile[0].ship_city}, Address:${Profile[0].ship_add}, Phone:${Profile[0].ship_phone} `


        //Pending Payment Invoce Create


        //SSL Commerce Payment Gatyea Call 

        return {status:"Success", message:data}


    }
    catch(e){
        return {status:"fail", message:"Something went wrong"}
    }
}

// const InvoiceList=async(req,res)=>{

// }

// const InvoiceProductList=async(req,res)=>{

// }

// const PaymentSuccess=async(req,res)=>{

// }

// const PaymentFail=async(req,res)=>{

// }

// const PaymetnCancel=async(req,res)=>{

// }

// const PaymentIPN=async(req,res)=>{

// }


module.exports={CalculateInvoice}