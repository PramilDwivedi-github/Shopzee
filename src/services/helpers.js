export function normalizeResponse(resp){
    return resp.json().then(data=>data)
}

export function handleErrors(resp){
    if(!resp.ok){
        const respData = normalizeResponse(resp);
        console.log(respData.errors)
        throw new Error(respData.message)
    }
    return resp;
}