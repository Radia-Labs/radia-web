import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Collection from './Collection';
import {Flex} from "../styles";
import {H1, Text} from './styles';
import { getCollections } from "../utils";
import { useCurrentUser } from "../Providers/Auth"
import { colors } from '../constants';

const Collections = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [collections, setCollections] = useState<Array<object>>();
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate()
 
    useEffect(() => {
          const init = async () => {
          if (currentUser) {
            setLoading(true)
            const _collections = await getCollections(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
            setCollections(_collections.Items);
            setLoading(false)
          }
        }
    
        if (currentUser)
          init()
    
      }, [currentUser])

      const goToAllNFTs = () => {
        navigate('/collectibles')
      }

      const renderEmpty = () => {        
        return <Text fontWeight="400" fontSize=".8" margin="0 1em 0 0"><Text fontSize=".8" cursor="pointer" color={colors.brightGreen} fontWeight="400" onClick={goToAllNFTs}>{<br/>}Click here</Text> to create your first Collection.</Text>
      }
    
    return (
      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
   
            {!loading && <><Flex>
              <H1 fontSize="1.5rem">Your Collections</H1>
            </Flex>
 
            <Flex justifyContent="flex-start" alignItems="left">
              {collections?.length ? collections?.map((collection: any) => (
                <Collection key={collection.sk} collection={collection}/>
              )) : renderEmpty()}
            </Flex></>}
        </Flex> 
    )
}


export default Collections;

