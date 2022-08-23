import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import Collectible from '../Components/Collectible';
import { 
    getUser
  } from "../utils";
  import {User} from '../Models/User'

const InProgress = () => {

    const { provider, login, logout, getAccounts, web3Auth } = useWeb3Auth();
    const [loading, setLoading] = useState(true)
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [page, setPage] = useState(-1);
    const [collectibles, setCollectibles] = useState<Array<object>>();
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState<Array<{pk: string, sk: string}>>([]);

    useEffect(() => {
        const init = async () => {
          const authUser = await web3Auth?.getUserInfo()
          const radiaUser = await getUser(authUser?.verifierId as string)
          setUser(radiaUser.Items[0])
          
          
          if (authUser) {
            let lastEvaluatedKey;
            const collectibles = await getCollectibles(authUser.verifierId as string, lastEvaluatedKey)
            setCollectibles(collectibles.Items)
            setLastEvaluatedKeys([collectibles.LastEvaluatedKey])
            setLoading(false)
          }
        }
    
        if (web3Auth && provider)
          init()
    
      }, [web3Auth, provider])


    const getPreviousCollectibles = async () => {
        setBackLoading(true)
        setPage(page-1)
        const prevCollectibles = await getCollectibles(user?.verifierId as string, lastEvaluatedKeys[page-1])
        setCollectibles(prevCollectibles.Items)    
        setBackLoading(false)
      }
    
      const getNextCollectibles = async () => {
        setNextLoading(true)
        setPage(page+1)
        const nextCollectibles = await getCollectibles(user?.verifierId as string, lastEvaluatedKeys[page+1])
        setCollectibles(nextCollectibles.Items)
        setLastEvaluatedKeys([...lastEvaluatedKeys, nextCollectibles.LastEvaluatedKey])
        setNextLoading(false)
      }    
    
      function getCollectibleType(collectible:any) {
        const currentAchievement = getCurrentAcheivement(collectible)
        return `${collectible.name} - ${currentAchievement}`    
      }
    
      function getCurrentAcheivement(collectible:any) {
            
        if (collectible.streamedMilliseconds < 3600000 ) {
          return '1 Hour Streamed'
        }
    
        if (collectible.streamedMilliseconds > 3600000 && collectible.streamedMilliseconds < 3600000 * 5) {
          return '5 Hours Streamed'
        }  
        
        if (collectible.streamedMilliseconds > 3600000 * 5 && collectible.streamedMilliseconds < 3600000 * 10) {
          return '10 Hours Streamed'
        }       
    
        if (collectible.streamedMilliseconds > 3600000 * 10 && collectible.streamedMilliseconds < 3600000 * 15) {
          return '15 Hours Streamed'
        }        
      
        if (collectible.streamedMilliseconds > 3600000 * 15 && collectible.streamedMilliseconds < 3600000 * 25) {
          return '25 Hours Streamed'
        }     
    
      }

    
    return (
        <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <Flex>
            <H1 fontSize="1.5rem">In Progress</H1>
            <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousCollectibles} onNext={getNextCollectibles} page={page} lastEvaluatedKey={lastEvaluatedKeys[page+1]}/>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="left">

            {collectibles?.length == 0 && !loading ? <H1 fontSize="1em">Calculating Data... Check back in a minute or so!</H1> : null}

            {collectibles?.map((collectible:object) => {
                const collectibleType = getCollectibleType(collectible);
                return <Collectible
                collectibleImage="https://via.placeholder.com/150"
                collectibleName={collectibleType as string}
                collectorImage={user?.profileImage}
                collectorName={user?.name}
                />
            })}
            </Flex>
        </Flex>
    )
}


export default InProgress;

