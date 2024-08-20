import { backend_url } from "./backendUrl";
import { handleErrors, normalizeResponse } from "./helpers";

export async function getProducts(role){
    let url = `${backend_url}${role === 'Customer'? 'product/api/all' : 'seller/api/myProducts'}`
    return fetch(url,{
        method:'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function getProductById(productId){
    let url = `${backend_url}product/api/${productId}`
    return fetch(url,{
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function getFilteredProducts(filter){
    let url = `${backend_url}product/api/filter`
    return fetch(url,{
        method:'POST',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({filter})
    })
    .then(handleErrors)
    .then(normalizeResponse);
}