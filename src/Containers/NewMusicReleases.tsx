import {useEffect, useState} from 'react';
import NewMusic from '../Components/NewMusic';
import {H1, Button} from '../Components/styles';
import { useCurrentUser } from "../Providers/Auth"
import {getSpotifyUser, getNewMusic} from '../utils';
import {colors} from '../constants';
import { Overlay, Spinner } from '../Components/styles';

const NewMusicReleases = () =>  {
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState<string|undefined>();
    const [newMusic, setNewMusic] = useState<object[]>();
    const { currentUser } = useCurrentUser()

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
            const _newMusic = await getNewMusic(currentUser?.idToken as string, currentUser?.appPubKey as string, spotify.Items[0].refresh_token, nextUrl as string);
            setNextUrl(_newMusic.albums.next)
            setNewMusic(_newMusic.albums.items)
            setLoading(false)
        }
    
        if (currentUser)
          init()
    
      }, [currentUser]);

      const loadMore = async () => {
        const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
        const _newMusic = await getNewMusic(currentUser?.idToken as string, currentUser?.appPubKey as string, spotify.Items[0].refresh_token, nextUrl as string);
        const _newMusicItems = newMusic?.concat(_newMusic.albums.items)
        setNextUrl(_newMusic.albums.next)
        setNewMusic(_newMusicItems)        
      }

    return (
        <>
        {loading && <Overlay>Loading...&nbsp;<Spinner/></Overlay>}
        {!loading && <H1 fontSize="1.5rem">New Music Releases</H1>}
        <NewMusic newMusic={newMusic as any}/>
        {nextUrl ? <Button background="transparent" border={`1px solid ${colors.primaryLight}`} disabled={!nextUrl} onClick={loadMore}>Load More</Button>: null}
        </>
    )
}
export default NewMusicReleases;