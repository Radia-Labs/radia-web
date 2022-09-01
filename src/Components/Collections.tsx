import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Collection from './Collection';
import {Flex} from "../styles";
import {H1, Text, Box} from './styles';
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
        navigate('/account/nfts')
      }

      const renderEmpty = () => {        
        return (
          <Box
            padding="1em"
            borderRadius="1em"
            border={`1px solid ${colors.primaryLight}`}
          >
            <Text fontSize=".8">You haven't created any Collections. <Text fontSize=".8" cursor="pointer" color={colors.brightGreen} onClick={goToAllNFTs}>Click here to create</Text>.</Text>
          </Box >
        )
      }
    
    return (
      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
   
            {!loading && <><Flex>
              <H1 fontSize="1.5rem">Your Collections</H1>
              <Text cursor="pointer" fontSize=".8em" onClick={goToAllNFTs}>View All Collectibles</Text>
            </Flex>
 
            <Flex justifyContent="flex-start" alignItems="left">
              {collections?.length ? collections?.map((collection: any) => (
                <Collection collection={collection}/>
              )) : renderEmpty()
            }
            </Flex></>}
        </Flex> 
    )
}


export default Collections;

