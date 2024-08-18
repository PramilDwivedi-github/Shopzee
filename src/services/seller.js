import { backend_url } from "./backendUrl";
import { handleErrors, normalizeResponse } from "./helpers";

const baseUrl = `${backend_url}seller/api`;

export async function removeProduct(product_id){
    let url =  `${baseUrl}/removeProducts`
    return fetch(url,{
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({product_id})
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function getSellerData(){
    let url = `${baseUrl}/data`;
    return  fetch(url,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(handleErrors)
    .then(normalizeResponse);
}



export async function addMyProduct(payload){
    let url =  `${baseUrl}/addProduct`
    return fetch(url,{
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(payload)
    })
    .then(handleErrors)
    .then(normalizeResponse);
}