const express=require('express');
const BrandController=require('../controller/BrandController');
const CategoriController=require('../controller/CategoriController');
const FetucherController=require('../controller/FetucherController');
const UserController=require('../controller/UserController');
const ProductController=require('../controller/ProductController');
const AuthVerify=require('../middelwaer/AuthVerify');
const ProfileController=require('../controller/ProfileController');


const route=express.Router();

//Brand Categori
route.get('/BrandList',BrandController.BrandList);
route.get('/CategoriList',CategoriController.CategoriList);
route.get('/FetucherList',FetucherController.FetucherList);



// User Login
route.get('/UserLogin/:email',UserController.UserLogin);
route.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);

// Product 
route.get('/ListByBrand/:brandID',ProductController.ListByBrand);
route.get('/ListByCategory/:categoryID',ProductController.ListByCategory);
route.get('/ListByRemark/:remark',ProductController.ListByRemark);
route.get('/SliderList',ProductController.SliderList);
route.get('/ListByKeyword/:keyword',ProductController.ListByKeyword);
route.get('/ListDetails/:id',ProductController.ProductDetails)


route.get('/CreateWishList',AuthVerify,ProductController.CreateWishList)


// Profile
route.get('/CreateProfile',AuthVerify,ProfileController.CreateProfile);
route.get('/ReadProfile',AuthVerify,ProfileController.ReadProfile);
route.get('/UpdateProfile',AuthVerify,ProfileController.UpdateProfile);


module.exports=route;
