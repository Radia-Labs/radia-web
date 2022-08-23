import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import { useNavigate } from 'react-router-dom'
import {Flex} from "../styles";
import {H1} from './styles';
import { getTopArtists, getUser, getSpotifyUser } from "../utils";
import Artist from '../Components/Artist';
import { createModuleResolutionCache } from 'typescript';

const TopArtists = () => {

    const { provider, login, logout, getAccounts, web3Auth } = useWeb3Auth();
    const [artists, setArtists] = useState<{items: Array<object>}>();
    const navigate = useNavigate() 

    useEffect(() => {
        const init = async () => {       
            const user = await web3Auth?.getUserInfo()
            const spotifyUser = await getSpotifyUser(user?.verifierId as string)
            const artists = await getTopArtists(spotifyUser.Items[0]?.refresh_token)
            setArtists(artists)
        }
        init()
      }, [web3Auth, provider])         
         
      function goToArtistProfile(artist:any) {
        navigate(`/artist/${artist.id}`)
      }


    return (
      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
        <Flex>
          <H1 fontSize="1.5rem">Your Top Artists</H1>
        </Flex>

        <Flex justifyContent="flex-start" alignItems="center">
            {artists?.items.map((artist:any) => {
            return <Artist artistImage={artist.images[0]?.url} artistName={artist.name} onClick={() => goToArtistProfile(artist)}/>
            })}
        </Flex>
      </Flex>
    );
}


export default TopArtists;

