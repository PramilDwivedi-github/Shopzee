import { backend_url } from "../backendUrl"
import { handleErrors, normalizeResponse } from "../helpers"

export async function loginUser(credentials,role){
    let url = `${backend_url}${role === 'customer' ? 'buyer' : 'seller'}/api/login`
    console.log(url)
    return fetch(url,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(handleErrors)
    .then(normalizeResponse)
}

export async function registerUser(credentials,role){
    let url = `${backend_url}${role === 'customer' ? 'buyer' : 'seller'}/api/register`
    return fetch(url,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(handleErrors)
    .then(normalizeResponse)
}