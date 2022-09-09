import {useState, useEffect} from 'react';
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import Collectible from '../Components/Collectible';
import {User} from '../Models/User'
import { useCurrentUser } from "../Providers/Auth"
import { 
  getCollectibleType
} from "../utils";

const InProgress = () => {
    const [loading, setLoading] = useState(true)
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [index, setIndex] = useState(4);
    const [allCollectibles, setAllCollectibles] = useState<Array<object>>([]);
    const [collectibles, setCollectibles] = useState<Array<object>>();
    const limit = undefined;
    const { currentUser } = useCurrentUser()
 
    useEffect(() => {
          const init = async () => {
          if (currentUser) {
            let lastEvaluatedKey;
            const collectibles = await getCollectibles(currentUser?.idToken as string, currentUser.appPubKey as string, currentUser.verifierId as string, limit, lastEvaluatedKey)
            const filteredCollectibles = collectibles.Items.filter((collectible: {transaction: object}) => !("status" in collectible))
            const sorted = filteredCollectibles.sort((a:{streamedMilliseconds: number},b:{streamedMilliseconds: number}) => b.streamedMilliseconds - a.streamedMilliseconds);
            setUser(currentUser)
            setAllCollectibles(sorted)
            setCollectibles(sorted.slice(0, 4))
            setLoading(false)
          }
        }
    
        if (currentUser)
          init()
    
      }, [currentUser])

    const getPreviousCollectibles = async () => {
        setBackLoading(true)
        setIndex(index-4)
        setCollectibles(allCollectibles?.slice(index-8, index-4))
        setBackLoading(false)
    }

    const getNextCollectibles = async () => {
        setNextLoading(true)
        setIndex(index+4)
        setCollectibles(allCollectibles?.slice(index, index+4)) 
        setNextLoading(false)     
    }


    const calculateProgress = (collectible:{streamedMilliseconds: number}) => {
      if (collectible.streamedMilliseconds <= 3600000 ) {
        if (parseInt((collectible.streamedMilliseconds / 3600000).toFixed(1)) >= 1)
          return (collectible.streamedMilliseconds / 3600000).toFixed(0)
        else
          return (collectible.streamedMilliseconds / 3600000).toFixed(1)
      }
  
      if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return (collectible.streamedMilliseconds / 3600000 * 5).toFixed(0)
      }  
      
      if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return (collectible.streamedMilliseconds / 3600000 * 10).toFixed(0)
      }       
  
      if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return (collectible.streamedMilliseconds / 3600000 * 15).toFixed(0)
      }        
    
      if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <= 3600000 * 25) {
        return (collectible.streamedMilliseconds / 3600000 * 25).toFixed(0)
      }  
    }
    
    return (
      collectibles?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <Flex>
            <H1 fontSize="1.5rem">In Progress</H1>
            <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousCollectibles} onNext={getNextCollectibles} disabledBack={index == 4} disabledNext={index >= allCollectibles.length}/>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="left">

            {collectibles?.map((collectible:any) => {
                const collectibleType = getCollectibleType(collectible);
                const progress = calculateProgress(collectible)
                return <Collectible
                key={collectible.sk}
                collectibleId={collectible.sk}
                collectibleImage={collectible.artist.images[0]?.url}
                collectibleName={collectibleType as string}
                collectorImage={user?.profileImage}
                collectorName={user?.name ? user?.name : user?.pk}
                progress={progress as string}
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default InProgress;

