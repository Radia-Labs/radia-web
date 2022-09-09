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

export const claimArtistCollectible = async (idToken:string, appPubKey:string, walletAddress:string, artist:object, streamedMilliseconds:number) => {
    const response = await fetch(`${SERVER_URL}/nft/mint/spotify/artist?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({walletAddress, artist, streamedMilliseconds})  
    });
    return await response.json();   
}

export const claimTrackCollectible = async (idToken:string, appPubKey:string, walletAddress:string, track:object,) => {
    const response = await fetch(`${SERVER_URL}/nft/mint/spotify/track?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({walletAddress, track})  
    });
    return await response.json(); 
}

export const getArtistCollector = async (idToken:string, appPubKey:string, pk:string, artistId:string) => {
    let url = `${SERVER_URL}/artist/collector/${artistId}?pk=${pk}&appPubKey=${appPubKey}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
    return await response.json();
}

export const createArtistCollector = async (idToken:string, appPubKey:string, artistId:string, user:{pk:string}, collectibleCount:number) => {
    const response = await fetch(`${SERVER_URL}/artist/collector/${artistId}/${user.pk}?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user, collectibleCount})  
    });
    return await response.json(); 
}

export const createArtistCollectible = async (idToken:string, appPubKey:string, artist:object, achievement:string) => {
    const response = await fetch(`${SERVER_URL}/artist/collectible?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({artist, achievement})  
    });
    return await response.json(); 
}

export const createUserArtistCollectible = async (idToken:string, appPubKey:string, pk:string, artist:object, achievement:string, streamedMilliseconds:number, user:object, status:string, transaction:object) => {
    const response = await fetch(`${SERVER_URL}/account/collectible/artist/${pk}?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({artist, achievement, streamedMilliseconds, user, status, transaction})  
    });
    return await response.json(); 
}

export const createUserTrackCollectible = async (idToken:string, appPubKey:string, pk:string, artist:object, track:object, achievement:string, user:object, status:string, transaction:object) => {
    const response = await fetch(`${SERVER_URL}/account/collectible/track/${pk}?appPubKey=${appPubKey}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({artist, track, achievement, user, status, transaction})  
    });
    return await response.json(); 
}

export const getCollectibleType = (collectible:any) => {
    let acheivement 
    
    console.log(collectible)
    if (collectible.achievement === 'streamedMilliseconds')
        acheivement = getCurrentAcheivement(collectible)

    if (collectible.achievement === 'streamedTrackInFirst24Hours')
        acheivement = getEarnedAcheivementFirst24(collectible)        
    
    if (collectible.achievement !== 'streamedMilliseconds' && collectible.achievement !== 'streamedTrackInFirst24Hours')
        acheivement = getEarnedAcheivement(collectible)

    return acheivement
  }

function getCurrentAcheivement(collectible:any) {
        
    if (collectible.streamedMilliseconds <= 3600000 ) {
        return `Streamed 1 Hour of ${collectible.artist.name}`
    }

    if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return `Streamed 5 Hours of ${collectible.artist.name}`
    }  

    if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return `Streamed 10 Hours of ${collectible.artist.name}`
    }       

    if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return `Streamed 15 Hours of ${collectible.artist.name}`
    }        

    if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <= 3600000 * 25) {
        return `Streamed 25 Hours of ${collectible.artist.name}`
    }     

}  

function getEarnedAcheivementFirst24(collectible:any) {
    let artists = collectible.track.artists.map((artist:any) => artist.name).join(", ");
    artists = artists.replace(/,\s*$/, "");
    return `Streamed ${collectible.track.name} from ${artists} in first 24 hours of release`
}

function getEarnedAcheivement(collectible:any) {

    if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return `Streamed 1 Hour of ${collectible.artist.name}`
    }  

    if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return `Streamed 5 Hours of ${collectible.artist.name}`
    }       

    if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return `Streamed 10 Hours of ${collectible.artist.name}`
    }        

    if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <=3600000 * 25) {
        return `Streamed 15 Hours of ${collectible.artist.name}`
    }     

    if (collectible.streamedMilliseconds >= 3600000 * 25) {
        return `Streamed 25 Hours of ${collectible.artist.name}`
    }             

}


export const goToArtist = (collectible:any) => {
    window.location.href = `/artist/${collectible.artist.id}`
}

export const generateCollectibleImage = (collectible:any) => {
    if (collectible.achievement === 'streamedTrackInFirst24Hours')
      return collectible?.track.album.images[0]?.url
    else
      return collectible?.artist.images[0]?.url
}