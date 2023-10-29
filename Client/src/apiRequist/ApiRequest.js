import axios from "axios";
let Basurl="http://localhost:5020/api/v1";


//BrandList api Requiest
export async function BrandListRequest() {
    try {
        let result=await axios.get(Basurl+'/BrandList');
        let data=result.data['data'];
        return data;
    }
    catch (e) {
        return [];
    }
}


//CategoriList api Requiest
export async function CategoriListRequiest(){
    try{
        let result =await axios.get(Basurl+'/CategoriList');
        let data=result.data['data'];
        return data;
    }
    catch (e) {
        return [];
    }
}


//ProductList by Remark
export async function ProductListByRemark(Remark){
    try{
        let result= await axios.get(Basurl+'ListByRemark/'+Remark);
        let data=result.data['data'];
        return data;
    }
    catch(e){
        return [];
    }
}
