
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Details from '../Components/Details';
import SimilarArtists from '../Components/SimilarArtists';
import {
  getCollectible,
  getSimilarArtists,
  getSpotifyArtist,
  getSpotifyUser,
  claimArtistCollectible,
  getArtistCollector,
  createArtistCollector,
  createArtistCollectible,
  claimTrackCollectible,
  createUserArtistCollectible,
  createUserTrackCollectible
} from '../utils';
import { useCurrentUser } from "../Providers/Auth"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function CollectibleDetails() {
  const [isMinting, setIsMinting] = useState(false)
  const [collectible, setCollectible] = useState<{artist:{id:string}, track:object, achievement:string, streamedMilliseconds:number}>();
  const [similarArtists, setSimilarArtists] = useState<object[]>();
  const params = useParams();
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    const init = async () => {
      const _collectible = await getCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, params.sk as string);
      const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
      if (_collectible.Count === 0) { 
        let artistId = params.sk;
        if (params.sk?.includes("Collectible|")) {
          artistId = params.sk.split("|")[3];
        }
        const artist = await getSpotifyArtist(currentUser?.idToken as string, currentUser?.appPubKey as string, artistId as string, spotify.Items[0].refresh_token );
        const collectible = {
          artist,
          user: undefined,
          achievement: "streamedMilliseconds",
          streamedMilliseconds: 3600000,
          created: undefined,
          transaction: undefined
      }     
      setCollectible(collectible as any)   
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
    
    setIsMinting(true)
    const toastId = toast.loading("Claiming collectible...")
    const status = 'minted';

    let transaction;
    if (collectible?.achievement === 'streamedTrackInFirst24Hours') {
      transaction = await claimTrackCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.addresses.polygon as string, collectible?.track as object)
      await createUserTrackCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, collectible?.artist as object, collectible?.track as object, collectible?.achievement as string, currentUser as object, status, transaction);
    }

    if (collectible?.achievement === 'streamedMilliseconds') {
      transaction = await claimArtistCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.addresses.polygon as string, collectible?.artist as object, collectible?.streamedMilliseconds as number)
      await createUserArtistCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, collectible?.artist as object, collectible?.achievement as string, collectible?.streamedMilliseconds as number, currentUser as object, status, transaction);
    }
    
    const artistCollector = await getArtistCollector(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, collectible?.artist.id as string);
    let collectibleCount = 1
    if (artistCollector.Count > 0)
      collectibleCount = artistCollector.Items[0].collectibleCount+ 1;
    await createArtistCollector(currentUser?.idToken as string, currentUser?.appPubKey as string, collectible?.artist.id as string, currentUser as any, collectibleCount);
    await createArtistCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, collectible?.artist as object, collectible?.achievement as string);

    setIsMinting(false)
    toast.update(toastId, { render: "Collectible claimed!", type: "success", isLoading: false, autoClose: 5000, hideProgressBar: true });
    const _collectible = await getCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, params.sk as string);
    setCollectible(_collectible.Items[0])

  }

  return (
    <>
      {collectible ? <Details collectible={collectible as any} claimCollectible={claimCollectible} isMinting={isMinting}/> : null}
      {similarArtists ? <SimilarArtists similarArtists={similarArtists as any} /> : null}
      <ToastContainer 
      position="bottom-right"
      theme="dark"
      hideProgressBar={isMinting === false}
      />        
    </>
  );
}

export default CollectibleDetails;