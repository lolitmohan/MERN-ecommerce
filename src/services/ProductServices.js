const mongoose=require('mongoose');
const ProductModel=require('../model/ProductModel');
const BrandModel=require('../model/BrandModel');
const CategoryModel=require('../model/CategoryModel')
const ProductSliderModel=require('../model/ProductSliderModel');
const FeaturesModel=require('../model/fetucherModel');
const ObjectId = mongoose.Types.ObjectId;

const AllCategories=async()=>{
    try{
      let data=await  CategoryModel.find();
        return {status:"Success", data:data}
    }
    catch(e){
        return {status:"Fail", message:"Something Went Wrong"}
    }
}

const AllBrands= async ()=>{
    try{
        let data=await BrandModel.find()
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:"Something Went Wrong"}
    }
}

const AllFeatures=async()=>{
    try{
        let data=await FeaturesModel.find();
        return {status:"Success",data:data}
    }
    catch{
        return {status:"fail",data:"Somethig Went Wrong"}
    }
}

const ProductByRemark= async (req)=>{
    try{
        let remark=req.params.remark;
        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {remark:remark}}
        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}
        let data=await ProductModel.aggregate(
            [matchStage]
        )
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

const ProductByCategory=async(req)=>{
    try{
        let categoryID= new ObjectId(req.params.categoryID);
        let JoinStage1={$lookup:{from:'categories', localField:'categoryID', foreignField:'_id', as:'category'}}
        let JoinStage2={$lookup:{from:'brands', localField:'brandID', foreignField:'_id', as:'brand'}}

        let matchStage={$match:{categoryID:categoryID}}

        let projectionStage={$project:{'category':0, 'brand._id':0, 'categoryID':0, 'brandID':0}}
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:'$category'}

        let data= await ProductModel.aggregate([
            matchStage, JoinStage1,JoinStage2,unwindBrandStage,unwindCategoryStage,projectionStage
        ])

        return {status:"Success", data:data}
    }
    catch(e){
        return {status:"fail", data:e.toString()};
    }
}

const ProductByBrand= async (req)=>{
    try{
        let brandID=new ObjectId(req.params.brandID)
        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {brandID:brandID}}
        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}
        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

const ProductByCategoryLimit10=async(req)=>{
    try{
        let categoryID= new ObjectId(req.params.categoryID);
        let JoinStage1={$lookup:{from:'categories', localField:'categoryID', foreignField:'_id', as:'category'}}
        let JoinStage2={$lookup:{from:'brands', localField:'brandID', foreignField:'_id', as:'brand'}}

        let matchStage={$match:{categoryID:categoryID}}

        let limit={$limit:10}

        let projectionStage={$project:{'category':0, 'brand._id':0, 'categoryID':0, 'brandID':0}}
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:'$category'}

        let data= await ProductModel.aggregate([
            matchStage, limit
        ])

        return {status:"Success", data:data}
    }
    catch(e){
        return {status:"fail", message:'Something went wrong'}
    }
}

const ProductBySlider= async (req)=>{
    try{
        let matchStage= {$match: {}}
        let limit= {$limit:5}
        let data=await ProductSliderModel.aggregate([matchStage,limit])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

const ProductByKeyword= async (req)=>{
    try{
        let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
        let SearchParam = [{title: SearchRegex},{shortDes: SearchRegex}]
        let SearchQuery = {$or:SearchParam}
        let matchStage=  {$match: SearchQuery};
        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}
        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindBrandStage, unwindCategoryStage, projectionStage])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}


const DetailsByID= async (req)=>{
    try{
        let ProductID=new ObjectId(req.params.id)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let JoinStage3={$lookup: {from: "productdetails", localField: "_id", foreignField: "productID", as: "details"}};


        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0,'details._id':0,'details.productID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}
        let unwindDetailsStage={$unwind: "$details"}

        let matchStage=  {$match: {_id:ProductID}};

        let data=await ProductModel.aggregate([
            matchStage,
            JoinStage1,
            JoinStage2,
            JoinStage3,
            unwindCategoryStage,
            unwindBrandStage,
            unwindDetailsStage,
            projectionStage,
        ])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}


module.exports={
    AllCategories,
    AllBrands,
    AllFeatures,
    ProductByRemark,
    ProductByCategory,
    ProductByBrand,
    ProductByCategoryLimit10,
    ProductBySlider,
    ProductByKeyword,
    DetailsByID
}