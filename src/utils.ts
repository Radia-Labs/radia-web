// const SERVER_URL = 'https://qk8wia3761.execute-api.us-east-1.amazonaws.com/prod'
const SERVER_URL = 'http://localhost:8000'

// TODO: add authentication tokens to each request 

export const getUser = async (pk:string) => {
    // const token = await getToken();
    const response = await fetch(`${SERVER_URL}/account/user?&pk=${pk}`, {
        headers: {
        // Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

export const createUser = async (user:object, addresses:object) => {
    // const token = await getToken();
    const response = await fetch(`${SERVER_URL}/account/user`, {
        method: 'POST',
        headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({...user, addresses})  
    });
    return await response.json();
}

export const getSpotifyAuth = async (code:string) => {
    // const token = await getToken();
    const response = await fetch(`${SERVER_URL}/integration/spotify/auth?code=${code}`, {
        headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    })
    return await response.json();
};

export const getSpotifyUser = async (pk:string) => {
    // const token = await getToken();
    const response = await fetch(`${SERVER_URL}/account/integration?type=spotify&pk=${pk}`, {
        headers: {
        // Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

export const createSpotifyIntegration = async (pk:string, integration:object) => {
    const response = await fetch(`${SERVER_URL}/account/integration/spotify/${pk}`, {
        method: 'POST',
        headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(integration)  
    });
    return await response.json();    
}

export const getCollectibles = async (pk:string, lastEvaluatedKey:object) => {
    // const token = await getToken();
    let url = `${SERVER_URL}/account/collectibles?pk=${pk}`;
    if (lastEvaluatedKey)
        url += `&lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}`;
    const response = await fetch(url, {
        headers: {
        // Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}