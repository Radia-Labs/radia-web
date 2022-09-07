import { useCurrentUser } from "../Providers/Auth"
import { colors } from '../constants';
import { Flex } from '../styles';
import {
    Text,
    CollectionWrapper,
    CollectionItem
} from './styles'
import { useNavigate } from 'react-router-dom';


type Props = {
    collection: {
        sk: string,
        name: string,
        nfts: Array<{
            nft_id: string,
            image_url: string

        }>
    }
}
const Collection = ({collection}: Props) => {
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate()

    const goToCollection = (sk:string) => {
        navigate(`/collection/${sk}`)
    }

    return (
        <CollectionWrapper onClick={() => goToCollection(collection.sk)}>
            <Flex alignItems="flex-start" justifyContent="flex-start" margin="0 0 1em 0">
                <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                    <Text fontSize="1em" margin="0 0 .5em 0">{collection.name}</Text>
                    <Text fontSize=".6em" color={colors.lightGrey}>Collected By <Text fontSize=".6em" >{currentUser?.name}</Text> </Text>
                </Flex>
            </Flex>

            <Flex alignItems="flex-start" justifyContent="flex-start">
                {collection.nfts.map(nft => {
                    return <CollectionItem key={nft.nft_id} image={nft.image_url}/>
                })}
            </Flex>
        </CollectionWrapper>
    )
}

export default Collection;