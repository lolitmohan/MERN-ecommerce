const { CalculateInvoice } = require("../services/InvoicesServices")



exports.InvoiceCreate=async(req,res)=>{
    let result=await CalculateInvoice(req);
    return res.status(200).json(result);

}