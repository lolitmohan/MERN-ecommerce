const express=require('express');
const BrandController=require('../controller/BrandController');
const CategoriController=require('../controller/CategoriController');
const FetucherController=require('../controller/FetucherController');
const UserController=require('../controller/UserController');
const ProductController=require('../controller/ProductController');
const AuthVerify=require('../middelwaer/AuthVerify');
const ProfileController=require('../controller/ProfileController');
const InvoiceController=require('../controller/InvoiceController');



const route=express.Router();

//Brand Categori
route.get('/BrandList',BrandController.BrandList);
route.get('/CategoriList',CategoriController.CategoriList);
route.get('/FetucherList',FetucherController.FetucherList);



// User Login
route.get('/UserLogin/:email',UserController.UserLogin);
route.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);

// Product  Serch
route.get('/ListByBrand/:brandID',ProductController.ListByBrand);
route.get('/ListByCategory/:categoryID',ProductController.ListByCategory);
route.get('/ListByRemark/:remark',ProductController.ListByRemark);
route.get('/SliderList',ProductController.SliderList);
route.get('/ListByKeyword/:keyword',ProductController.ListByKeyword);
route.get('/ListDetails/:id',ProductController.ProductDetails)
route.get('/ListByShimiler/:id',ProductController.ListByShimiler)
route.get('/SliderList/',ProductController.SliderList)



//Wish
route.post('/CreateWishList',AuthVerify,ProductController.CreateWishList)
route.get('/RemoveWish',AuthVerify,ProductController.RemoveWishList)
route.get('/WishList',AuthVerify,ProductController.WishList);

//Cart
route.get('/CreateCartList',AuthVerify,ProductController.CreateCartList);
route.get('/RemoveCartList',AuthVerify,ProductController.RemoveCartList);
route.get('/CartList',AuthVerify,ProductController.CartList);


// Invoce
route.get('/InvoiceCreate',AuthVerify,InvoiceController.InvoiceCreate);



// Profile
route.get('/CreateProfile',AuthVerify,ProfileController.CreateProfile);
route.get('/ReadProfile',AuthVerify,ProfileController.ReadProfile);
route.get('/UpdateProfile',AuthVerify,ProfileController.UpdateProfile);


module.exports=route;
