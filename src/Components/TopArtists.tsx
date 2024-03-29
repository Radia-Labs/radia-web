import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import {Flex} from "../styles";
import {TopArtistWrapper, H1} from './styles';
import Pagination from './Pagination';
import { getArtists } from "../utils";
import Artist from '../Components/Artist';
import { useCurrentUser } from "../Providers/Auth"
import { useNavigate } from "react-router-dom";

const TopArtists = () => {

    const { provider, web3Auth } = useWeb3Auth();
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [artists, setArtists] = useState<Array<object>>();
    const [allArtists, setAllArtists] = useState<Array<object>>([]);
    const [index, setIndex] = useState(9);
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate();
    const limit = undefined;

    useEffect(() => {
        const init = async () => {
          if (currentUser) {
            let lastEvaluatedKey;
            const artists = await getArtists(currentUser?.idToken as string, currentUser.appPubKey as string, currentUser.verifierId as string, limit, lastEvaluatedKey)
            setAllArtists(artists.Items)
            setArtists(artists.Items.slice(0, index))
          }
        }
        init()
      }, [currentUser])        


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

  const goToArtist = async (artist: {id:string}) => {
    navigate(`/artist/${artist.id}`)
  }

    return (
      artists?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
        <Flex>
          <H1 fontSize="1.5rem">Your Top Artists</H1>
          <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousArtists} onNext={getNextArtists} disabledBack={index == 9} disabledNext={index >= allArtists.length}/>
        </Flex>

        <TopArtistWrapper >
            {artists?.map((artist:any) => {
            return <Artist 
            key={artist.id}
            artistImage={artist.images[0]?.url} 
            artistName={artist.name} 
            onClick={() => goToArtist(artist)}/>
            })}
        </TopArtistWrapper>
      </Flex> : null
    );
 

}


export default TopArtists;

