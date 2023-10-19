const { CalculateInvoice, PaymentSuccessService, PaymentCancelService, PaymentFailService, PaymentIPNService } = require("../services/InvoicesServices");


exports.InvoiceCreate=async(req,res)=>{
    let result=await CalculateInvoice(req);
    return res.status(200).json(result);

}

exports.PaymentSuccess=async(req,res)=>{
    let result=await PaymentSuccessService(req);
    return res.status(200).json(result);

}

exports.PaymentCancel=async(req,res)=>{
    let result=await PaymentCancelService(req);
    return res.status(200).json(result);

}

exports.PaymentFail=async(req,res)=>{
    let result=await PaymentFailService(req);
    return res.status(200).json(result);

}

exports.PaymentIPN=async(req,res)=>{
    let result=await PaymentIPNService(req);
    return res.status(200).json(result);

}