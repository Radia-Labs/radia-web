import {useState, useEffect} from 'react';
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import {User} from '../Models/User'
import Achievement from './Achievement';
import { useCurrentUser } from "../Providers/Auth"

const ReadyToClaim = () => {
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [index, setIndex] = useState(4);
    const [allCollectibles, setAllCollectibles] = useState<Array<object>>([]);
    const [collectibles, setCollectibles] = useState<Array<object>>();
    const { currentUser } = useCurrentUser()
    const limit = undefined;

    useEffect(() => {
        const init = async () => {
          
          if (currentUser) {
            let lastEvaluatedKey;
            const collectibles = await getCollectibles(currentUser?.idToken as string, currentUser.appPubKey as string, currentUser.verifierId as string, limit, lastEvaluatedKey)
            const filteredCollectibles = collectibles.Items.filter((collectible: {transaction: object}) => ("status" in collectible))
            const sorted = filteredCollectibles.sort((a:{streamedMilliseconds: number},b:{streamedMilliseconds: number}) => b.streamedMilliseconds - a.streamedMilliseconds);
            setAllCollectibles(sorted)
            setCollectibles(sorted.slice(0, 4))
            setUser(currentUser)
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
    
    function getCollectibleType(collectible:any) {
      const currentAchievement = getEarnedAcheivement(collectible)
      return `${collectible.artist.name} - ${currentAchievement}`    
    }
  
    function getEarnedAcheivement(collectible:any) {
  
      if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return '1 Hour Streamed'
      }  
      
      if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return '5 Hours Streamed'
      }       
  
      if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return '10 Hours Streamed'
      }        
    
      if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <=3600000 * 25) {
        return '15 Hours Streamed'
      }     

      if (collectible.streamedMilliseconds >= 3600000 * 25) {
          return '25 Hours Streamed'
      }             
  
    }
    
    return (
      collectibles?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <Flex>
            <H1 fontSize="1.5rem">Ready To Claim</H1>
            <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousCollectibles} onNext={getNextCollectibles} disabledBack={index == 4} disabledNext={index >= allCollectibles.length}/>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="left">

            {collectibles?.map((collectible:any) => {
                const collectibleType = getCollectibleType(collectible);
                return <Achievement
                key={collectible.sk}
                collectibleId={collectible.sk}
                collectibleImage={collectible.artist.images[0]?.url}
                collectibleName={collectibleType as string}
                collectorImage={user?.profileImage}
                collectorName={user?.name}
                showChip={true}
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default ReadyToClaim;

