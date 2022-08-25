import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import { useNavigate } from 'react-router-dom'
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getArtists, getUser } from "../utils";
import Artist from '../Components/Artist';
import {User} from '../Models/User'
import { getPublicCompressed } from "@toruslabs/eccrypto";

const TrendingArtists = () => {

    const { provider, login, logout, getAccounts, web3Auth } = useWeb3Auth();
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [artists, setArtists] = useState<Array<object>>();
    const [lastEvaluatedKeysArtists, setLastEvaluatedKeysArtists] = useState<Array<{pk: string, sk: string}>>([]);  
    const [artistsPage, setArtistsPage] = useState(-1);    
    const navigate = useNavigate() 

    useEffect(() => {
        const init = async () => {
          const authUser = await web3Auth?.getUserInfo()
          const appScopedPrivateKey = await provider?.getPrivateKey()
          const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");          
          const radiaUser = await getUser(authUser?.idToken as string, appPubKey as string, authUser?.verifierId as string)          
          setUser(radiaUser.Items[0])          
          if (authUser) {
            let lastEvaluatedKey;
            const artists = await getArtists(authUser?.idToken as string, appPubKey as string, authUser.verifierId as string, lastEvaluatedKey)
            setArtists(artists.Items)
            setLastEvaluatedKeysArtists([artists.LastEvaluatedKey])
          }
        }
        init()
      }, [web3Auth, provider])        

    const getPreviousArtists = async () => {
        setBackLoading(true)
        setArtistsPage(artistsPage-1)
        const appScopedPrivateKey = await provider?.getPrivateKey()
        const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex"); 
        const authUser = await web3Auth?.getUserInfo()                
        const prevArtists = await getArtists(authUser?.idToken as string, appPubKey as string, user?.verifierId as string, lastEvaluatedKeysArtists[artistsPage-1])
        setArtists(prevArtists.Items)    
        setBackLoading(false)
      }
    
      const getNextArtists = async () => {
        setNextLoading(true)
        setArtistsPage(artistsPage+1)
        const appScopedPrivateKey = await provider?.getPrivateKey()
        const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex"); 
        const authUser = await web3Auth?.getUserInfo()          
        const nextArtists = await getArtists(authUser?.idToken as string, appPubKey as string, user?.verifierId as string, lastEvaluatedKeysArtists[artistsPage+1])
        setArtists(nextArtists.Items)
        setLastEvaluatedKeysArtists([...lastEvaluatedKeysArtists, nextArtists.LastEvaluatedKey])
        setNextLoading(false)
      }   
         
      function goToArtistProfile(artist:any) {
        navigate(`/artist/${artist.id}`)
      }


    return (
      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
        <Flex>
          <H1 fontSize="1.5rem">Trending Artists</H1>
          <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousArtists} onNext={getNextArtists} page={artistsPage} lastEvaluatedKey={lastEvaluatedKeysArtists[artistsPage+1]}/>
        </Flex>
        {artists?.length == 0 && <Flex justifyContent="flex-start" alignItems="left">
            <H1 fontSize="1em">Calculating Data... Check back in a minute or so!</H1>
        </Flex>}

        <Flex justifyContent="flex-start" alignItems="center">
            {artists?.map((artist:any) => {
            return <Artist 
            key={artist.id}
            artistImage={artist.images[0]?.url} 
            artistName={artist.name} 
            onClick={() => goToArtistProfile(artist)}/>
            })}
        </Flex>
      </Flex>
    );
 

}


export default TrendingArtists;

