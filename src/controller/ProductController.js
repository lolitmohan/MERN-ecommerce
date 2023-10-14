const {ProductByCategory, ProductByBrand, ProductByRemark, ProductBySlider, ProductByKeyword, DetailsByID, ProductByCategoryLimit10}=require('../services/ProductServices');
const { CreateWish, RemoveWish, Wish } = require('../services/WishServices');
const { CreateCart, RemoveCart, Cart } = require('../services/CartServices');


exports.ListByBrand=async (req,res)=>{
    let result=await  ProductByBrand(req)
    return res.status(200).json(result)
}

exports.ListByCategory=async(req,res)=>{
    let data=await ProductByCategory(req);
    return res.status(200).json(data);
}

exports.ListByShimiler=async(req,res)=>{
    let data= await ProductByCategoryLimit10(req);
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

exports.RemoveWishList=async (req,res)=>{
    let result=await RemoveWish(req)
    return res.status(200).json(result)
}


exports.WishList=async (req,res)=>{
    let result=await Wish(req)
    return res.status(200).json(result)
}

exports.CreateCartList=async(req,res)=>{
    let result= await CreateCart(req);
    return res.status(200).json(result);
}

exports.RemoveCartList=async(req,res)=>{
    let result=await RemoveCart(req);
    return res.status(200).json(result);
}

exports.CartList=async(req,res)=>{
    let result =await Cart(req);
    return res.status(200).json(result);
}