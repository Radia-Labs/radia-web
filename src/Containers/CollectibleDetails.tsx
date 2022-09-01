
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Details from '../Components/Details';
import SimilarArtists from '../Components/SimilarArtists';
import {
  getCollectible,
  getSimilarArtists,
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
      setCollectible(_collectible.Items[0])
      const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
      const _similarArtists = await getSimilarArtists(currentUser?.idToken as string, currentUser?.appPubKey as string, _collectible.Items[0].artist.id, spotify.Items[0].refresh_token);
      setSimilarArtists(_similarArtists.artists.slice(0, 4))
      
    }

    if (!collectible && currentUser)
      init()

  }, [currentUser]);


  return (
    <>
      {collectible ? <Details collectible={collectible as any} /> : null}
      {similarArtists ? <SimilarArtists similarArtists={similarArtists as any} /> : null}
    </>
  );
}

export default CollectibleDetails;