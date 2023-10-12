const ProfileModel = require('../model/ProfileModel');
const UserModel=require('../model/UserModel');
const SendEmailUtility = require('../utility/SendEmail');
const { EncodeToken } = require('../utility/TokenHelper');

const UserOTP=async(req)=>{
    try{
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);
        let EmailText="Your Verification Code is "+code;

        await SendEmailUtility(email,EmailText, "PIN Email Verification");
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});

        return {status:"Success", message:"6 Digit OTP has been Send Success"};
    }
    catch(e){
        return {status:"fail", message:"Something Went Wrong"};
    }
}

const UserVerify = async (req)=>{
    try{
        let email=req.params.email;
        let code=req.params.otp;
        if(code==="0"){
            return {status:"fail", message:"Something Went Wrong"}
        }
        else {
            let total=await UserModel.find({email: email, otp: code}).count('total');
            if(total===1){
                let user_id=await UserModel.find({email: email, otp: code}).select('_id')
                let token= EncodeToken(email,user_id[0]['_id'].toString())
                await UserModel.updateOne({email:email}, {$set:{otp:'0'}}, {upsert:true})
                return {status:"success", message:"Valid OTP", token:token}
            }else{
                return {status:"fail", message:"Something Went Wrong"}
            }
        }
    }
    catch (e) {
        return {status:"fail", data:"Something Went Wrong"}
    }
}

const UserProfileSave=async(req)=>{
    let user_id=req.headers.id;
    let reqBody=req.body;
    reqBody.userID=user_id;
    try{
        await ProfileModel.updateOne({userID:user_id},{$se:reqBody},{upsert:true})
        return {status:"Success", message:'Profile Save Change'}
    }
    catch(e){
        return {status:'fail', message:"Something went wrong"}
    }
}

const UserProfileDetails=async(req)=>{
    let user_id=req.headers.id;
    try{
        let data= await ProfileModel.find({userID:user_id});
        return {status:"Success", data:data}
    }
    catch(e){
        return {status:"fail", message:'Something Went wrong'}
    }
}

module.exports={UserOTP,UserVerify,UserProfileSave,UserProfileDetails};
