import { useCurrentUser } from "../Providers/Auth"
import { colors } from '../constants';
import { Flex } from '../styles';
import {
    Text,
    CollectionWrapper,
    CollectionItem
} from './styles'

type Props = {
    collection: {
        name: string,
        nfts: Array<{
            nft_id: string,
            image_url: string

        }>
    }
}
const Collection = ({collection}: Props) => {
    const { currentUser } = useCurrentUser()
    return (
        <CollectionWrapper>
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