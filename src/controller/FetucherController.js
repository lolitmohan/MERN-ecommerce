const {AllFeatures}=require('../services/ProductServices');

exports.FetucherList=async(req,res)=>{
    let result=await AllFeatures();
    return res.status(200).json(result);
}