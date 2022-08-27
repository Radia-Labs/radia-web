import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { 
    getUser
  } from "../utils";
import {User} from '../Models/User'
import Achievement from './Achievement';

const RecentlyEarned = () => {
    const { provider, web3Auth } = useWeb3Auth();
    const [loading, setLoading] = useState(true)
    const [loadingNext, setNextLoading] = useState(false);
    const [loadingBack, setBackLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [index, setIndex] = useState(4);
    const [allCollectibles, setAllCollectibles] = useState<Array<object>>([]);
    const [collectibles, setCollectibles] = useState<Array<object>>();
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
            const collectibles = await getCollectibles(authUser?.idToken as string, appPubKey as string, authUser.verifierId as string, limit, lastEvaluatedKey)
            const filteredCollectibles = collectibles.Items.filter((collectible: {transaction: object}) => ("transaction" in collectible))
            const sorted = filteredCollectibles.sort((a:{streamedMilliseconds: number},b:{streamedMilliseconds: number}) => b.streamedMilliseconds - a.streamedMilliseconds);
            setAllCollectibles(sorted)
            setCollectibles(sorted.slice(0, 4))
            setLoading(false)
          }
        }
    
        if (web3Auth && provider)
          init()
    
      }, [web3Auth, provider])
  

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
            <H1 fontSize="1.5rem">Recently Earned</H1>
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
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default RecentlyEarned;

