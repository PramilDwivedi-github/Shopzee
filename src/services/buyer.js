import { backend_url } from "./backendUrl";
import { handleErrors, normalizeResponse } from "./helpers";

const baseUrl =  `${backend_url}buyer/api`

export async function addCartItem(payload){
   let url = `${baseUrl}/addCartItem`;
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

export async function getMyOrders(){
    let url = `${baseUrl}/myorders`;
    return  fetch(url,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function getMyCartItems(){
    let url = `${baseUrl}/mycart`;
    return  fetch(url,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function removeCartItem(item_id){
    let url = `${baseUrl}/removeCartItem`;
    return  fetch(url,{
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({item_id})
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function placeMyOrder(){
    let url = `${baseUrl}/placeOrder`;
    return  fetch(url,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(handleErrors)
    .then(normalizeResponse);
}

export async function getBuyerData(){
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