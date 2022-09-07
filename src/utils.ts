// const SERVER_URL = 'https://qk8wia3761.execute-api.us-east-1.amazonaws.com/prod'
const SERVER_URL = 'http://localhost:8000'

export const getUser = async (idToken:string, appPubKey:string, pk:string, ) => {
    const response = await fetch(`${SERVER_URL}/account/user?&pk=${pk}&appPubKey=${appPubKey}`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const createUser = async (idToken:string, appPubKey:string, user:object, addresses:object) => {
    const response = await fetch(`${SERVER_URL}/account/user`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({...user, addresses, appPubKey})  
    });
    return await response.json();
}

export const updateUser = async (idToken:string, appPubKey:string, pk:string, data:object) => {
    const response = await fetch(`${SERVER_URL}/account/user`, {
        method: 'PUT',
        headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({...data, verifierId:pk, appPubKey})  
    });
    return await response.json();
}

export const getSpotifyAuth = async (idToken:string, appPubKey:string, code:string) => {
    const response = await fetch(`${SERVER_URL}/integration/spotify/auth?code=${code}&appPubKey=${appPubKey}`, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        },
    })
    return await response.json();
};

export const getSpotifyUser = async (idToken:string, appPubKey:string, pk:string) => {
    const response = await fetch(`${SERVER_URL}/account/integration?type=spotify&pk=${pk}&appPubKey=${appPubKey}`, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getSpotifyProfile= async (idToken:string, appPubKey:string, refreshToken:string) => {
    const response = await fetch(`${SERVER_URL}/account/spotify/me?refreshToken=${refreshToken}&appPubKey=${appPubKey}`, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getSpotifyArtist = async (idToken:string, appPubKey:string, id:string, refreshToken:string) => {
    let url = `${SERVER_URL}/integration/spotify/artist?id=${id}&refreshToken=${refreshToken}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const createSpotifyIntegration = async (idToken:string, appPubKey:string, pk:string, integration:object) => {
    const response = await fetch(`${SERVER_URL}/account/integration/spotify/${pk}?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(integration)  
    });
    return await response.json();    
}

export const getCollectibles = async (idToken:string, appPubKey:string, pk:string, limit?:number, lastEvaluatedKey?:object) => {
    let url = `${SERVER_URL}/account/collectibles?pk=${pk}&appPubKey=${appPubKey}`;
    if (limit)
        url += `&limit=${limit}`;
    if (lastEvaluatedKey)
        url += `&lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}`;        
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}


export const getCollectible = async (idToken:string, appPubKey:string, pk:string, sk:string) => {
    let url = `${SERVER_URL}/account/collectible?pk=${pk}&sk=${sk}&appPubKey=${appPubKey}`;  
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getArtists = async (idToken:string, appPubKey:string, pk:string, limit?:number, lastEvaluatedKey?:object) => {
    let url = `${SERVER_URL}/account/artists?pk=${pk}&appPubKey=${appPubKey}`;
    if (lastEvaluatedKey)
        url += `&lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getArtist = async (idToken:string, appPubKey:string, id:string) => {
    let url = `${SERVER_URL}/artist/${id}?appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getArtistCollectibles = async (idToken:string, appPubKey:string, id:string) => {
    let url = `${SERVER_URL}/artist/collectibles/${id}?appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getArtistCollectiblesBySk = async (idToken:string, appPubKey:string, sk:string) => {
    let url = `${SERVER_URL}/artist/collectibles/sk?sk=${sk}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getArtistCollectors = async (idToken:string, appPubKey:string, id:string) => {
    let url = `${SERVER_URL}/artist/collectors/${id}?appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getTopArtists = async (idToken:string, appPubKey:string, refreshToken:string) => {
    let url = `${SERVER_URL}/account/artists/top?refreshToken=${refreshToken}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getSimilarArtists = async (idToken:string, appPubKey:string, id:string, refreshToken:string) => {
    let url = `${SERVER_URL}/account/artists/similar?id=${id}&refreshToken=${refreshToken}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getNewMusic = async (idToken:string, appPubKey:string, refreshToken:string, nextUrl:string) => {
    let url = `${SERVER_URL}/account/artists/new-music?refreshToken=${refreshToken}&appPubKey=${appPubKey}`;
    if (nextUrl)
        url += `&nextUrl=${encodeURIComponent(nextUrl)}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getNFTs = async (idToken:string, appPubKey:string, chains:string, addresses:string, nextUrl:string) => {
    let url = `${SERVER_URL}/account/nfts?chains=${chains}&addresses=${addresses}&appPubKey=${appPubKey}`;
    if (nextUrl)
        url += `&nextUrl=${encodeURIComponent(nextUrl)}`; 
    
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getNFTByTokenId = async (idToken:string, appPubKey:string, chain:string, contractAddress:string, tokenId:string) => {
    let url = `${SERVER_URL}/account/nft?chain=${chain}&contractAddress=${contractAddress}&tokenId=${tokenId}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getCollections = async (idToken:string, appPubKey:string, pk:string) => {
    let url = `${SERVER_URL}/account/collections?pk=${pk}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const getCollection = async (idToken:string, appPubKey:string, pk:string, sk:string) => {
    let url = `${SERVER_URL}/account/collection?pk=${pk}&sk=${sk}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const createCollection = async (idToken:string, appPubKey:string, pk:string, name:string, nfts: object[]) => {
    const response = await fetch(`${SERVER_URL}/account/collections/${pk}?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({name, nfts})  
    });
    return await response.json();    
}

export const deleteCollection = async (idToken:string, appPubKey:string, pk:string, sk:string) => {
    const response = await fetch(`${SERVER_URL}/account/collections/${pk}?appPubKey=${appPubKey}&sk=${sk}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({sk})  
    });
    return await response.json();    
}