const {AllCategories}=require('../services/ProductServices');
exports.CategoriList=async(req,res)=>{
    let result=await AllCategories();
    return res.status(200).json(result);
}