const {UserOTP,UserVerify}=require('../services/UserServices');

exports.UserLogin=async(req,res)=>{
    let result=await UserOTP(req);
    return res.status(200).json(result);
}

exports.VerifyLogin=async (req,res)=>{
    let result=  await UserVerify(req);
    if(result['status']==="success"){
        res.cookie('token', result['token']) // For Web cookie //
        return res.status(200).json(result) // For Other's
    }
    else{
        return res.status(200).json(result)
    }
}
