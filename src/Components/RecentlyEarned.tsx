import {useState, useEffect} from 'react';
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import {User} from '../Models/User'
import Achievement from './Achievement';
import { useCurrentUser } from "../Providers/Auth"
import { 
  getCollectibleType,
  generateCollectibleImage
} from "../utils";

const RecentlyEarned = () => {
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
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
            const filteredCollectibles = collectibles.Items.filter((collectible: {transaction: object}) => ("transaction" in collectible))
            const sorted = filteredCollectibles.sort((a:{streamedMilliseconds: number},b:{streamedMilliseconds: number}) => b.streamedMilliseconds - a.streamedMilliseconds);
            setAllCollectibles(sorted)
            setCollectibles(sorted.slice(0, 4))
            
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
    
    return (
      collectibles?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <Flex>
            <H1 fontSize="1.5rem">Recently Earned</H1>
            <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousCollectibles} onNext={getNextCollectibles} disabledBack={index == 4} disabledNext={index >= allCollectibles.length}/>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="left">

            {collectibles?.map((collectible:any) => {
                const collectibleType = getCollectibleType(collectible);
                return <Achievement
                key={collectible.sk}
                collectibleId={collectible.sk}
                collectibleImage={generateCollectibleImage(collectible)}
                collectibleName={collectibleType as string}
                collectorImage={currentUser?.profileImage}
                collectorName={currentUser?.userName || currentUser?.name || currentUser?.email || currentUser?.pk}
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default RecentlyEarned;

