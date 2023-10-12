const {ProductByCategory, ProductByBrand, ProductByRemark, ProductBySlider, ProductByKeyword, DetailsByID}=require('../services/ProductServices');
const { CreateWish } = require('../services/WishServices');


exports.ListByBrand=async (req,res)=>{
    let result=await  ProductByBrand(req)
    return res.status(200).json(result)
}

exports.ListByCategory=async(req,res)=>{
    let data=await ProductByCategory(req);
    return res.status(200).json(data);
}

exports.ListByRemark=async(req,res)=>{
    let result=await ProductByRemark(req);
    return res.status(200).json(result);
}

exports.SliderList=async(req,res)=>{
    let result = await ProductBySlider(req);
    return res.status(200).json(result);
}

exports.ListByKeyword=async(req,res)=>{
    let result=await ProductByKeyword(req);
    return res.status(200).json(result);
}

exports.ProductDetails=async (req,res)=>{
    let result=await  DetailsByID(req)
    return res.status(200).json(result)
}

exports.CreateWishList=async (req,res)=>{
    let result=await CreateWish(req)
    return res.status(200).json(result)
}