export async function normalizeResponse(resp){
    return resp.json().then(data=>data)
}

export async function handleErrors(resp){
    if(!resp.ok){
        const respData = await normalizeResponse(resp);
        console.log(respData)
        throw new Error(respData.message)
    }
    return resp;
}