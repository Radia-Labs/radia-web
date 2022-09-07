
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Details from '../Components/Details';
import SimilarArtists from '../Components/SimilarArtists';
import {
  getCollectible,
  getSimilarArtists,
  getSpotifyArtist,
  getSpotifyUser
} from '../utils';
import { useCurrentUser } from "../Providers/Auth"


function CollectibleDetails() {
  const [collectible, setCollectible] = useState<object>();
  const [similarArtists, setSimilarArtists] = useState<object[]>();
  const params = useParams();
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    const init = async () => {
      const _collectible = await getCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, params.sk as string);
      console.log(_collectible)
      const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
      if (_collectible.Count === 0) { 
        let artistId = params.sk;
        if (params.sk?.includes("Collectible|")) {
          artistId = params.sk.split("|")[3];
        }
        const artist = await getSpotifyArtist(currentUser?.idToken as string, currentUser?.appPubKey as string, artistId as string, spotify.Items[0].refresh_token );
        console.log("artist", artist)
        const collectible = {
          artist,
          user: undefined,
          achievement: "streamedMilliseconds",
          streamedMilliseconds: 3600000,
          created: undefined,
          transaction: undefined
      }     
      setCollectible(collectible)   
      const _similarArtists = await getSimilarArtists(currentUser?.idToken as string, currentUser?.appPubKey as string, artist.id, spotify.Items[0].refresh_token);
      setSimilarArtists(_similarArtists.artists.slice(0, 4))      

      } else {
        setCollectible(_collectible.Items[0])
        const _similarArtists = await getSimilarArtists(currentUser?.idToken as string, currentUser?.appPubKey as string, _collectible.Items[0].artist.id, spotify.Items[0].refresh_token);
        setSimilarArtists(_similarArtists.artists.slice(0, 4))        
      }
      
    }

    if (!collectible && currentUser)
      init()

  }, [collectible, currentUser]);

  const claimCollectible = async () => {
    console.log("claimCollectible")

  }

  return (
    <>
      {collectible ? <Details collectible={collectible as any} claimCollectible={claimCollectible}/> : null}
      {similarArtists ? <SimilarArtists similarArtists={similarArtists as any} /> : null}
    </>
  );
}

export default CollectibleDetails;