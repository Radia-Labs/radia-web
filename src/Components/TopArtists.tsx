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
    const [allArtists, setAllArtists] = useState<Array<object>>([]);
    const [index, setIndex] = useState(9);
    const navigate = useNavigate() 
    const limit = undefined;

    useEffect(() => {
        const init = async () => {
          const authUser = await web3Auth?.getUserInfo()
          const appScopedPrivateKey = await provider?.getPrivateKey()
          const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");          
          const radiaUser = await getUser(authUser?.idToken as string, appPubKey as string, authUser?.verifierId as string)          
          setUser(radiaUser.Items[0])          
          if (authUser) {
            let lastEvaluatedKey;
            const artists = await getArtists(authUser?.idToken as string, appPubKey as string, authUser.verifierId as string, limit, lastEvaluatedKey)
            setAllArtists(artists.Items)
            setArtists(artists.Items.slice(0, index))
          }
        }
        init()
      }, [web3Auth, provider])        


    const getPreviousArtists = async () => {
      setBackLoading(true)
      setIndex(index-9)
      setArtists(allArtists?.slice(index-18, index-9))
      setBackLoading(false)
  }

  const getNextArtists = async () => {
      setNextLoading(true)
      setIndex(index+9)
      setArtists(allArtists?.slice(index, index+9)) 
      setNextLoading(false)     

  }    
      
  function goToArtistProfile(artist:any) {
    navigate(`/artist/${artist.id}`)
  }


    return (
      artists?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
        <Flex>
          <H1 fontSize="1.5rem">Your Top Artists</H1>
          <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousArtists} onNext={getNextArtists} disabledBack={index == 9} disabledNext={index >= allArtists.length}/>
        </Flex>

        <Flex justifyContent="flex-start" alignItems="center">
            {artists?.map((artist:any) => {
            return <Artist 
            key={artist.id}
            artistImage={artist.images[0]?.url} 
            artistName={artist.name} 
            onClick={() => goToArtistProfile(artist)}/>
            })}
        </Flex>
      </Flex> : null
    );
 

}


export default TrendingArtists;

