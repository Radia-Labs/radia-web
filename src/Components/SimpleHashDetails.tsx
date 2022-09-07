import {
    CollectibleDetailsWrapper,
    CollectibleDetailsImage,
    CollectibleTextWrapper,
    CollectibleTitle,
    FanWrapper,
    FanCard,
    FanImage,
    FanName,
    FanNameWrapper,
    NFTDetailsWrapper,
    Button,
    Text
} from "./styles";

import {Flex} from '../styles'
import { colors } from "../constants";

type Props = {
    currentUser: {
        profileImage: string,
        addresses: {polygon: string}
    };
    collectible: {
        image_url: string,
        name:string,
        extra_metadata: {
            artist: {
                images: Array<{url:string}>,
                name: string,
                external_urls: {
                    spotify: string
                }
            },
        },
        collection: {
            image_url: string,
            name: string
        }
    }
}

const Details = ({currentUser, collectible}: Props) => (
    <CollectibleDetailsWrapper>
        <CollectibleDetailsImage image={collectible.image_url}/>
        
        <CollectibleTextWrapper >
            <CollectibleTitle>{collectible.name}</CollectibleTitle>

            <FanWrapper>

                <FanCard width="45%" margin="0 1em 0 0">
                    <FanImage referrerPolicy="no-referrer" src={currentUser.profileImage}/>
                    <FanNameWrapper>
                        <FanName color={colors.lightGrey} fontSize=".5em">
                            Owned By
                        </FanName>
                        <FanName title={currentUser.addresses.polygon}>{currentUser.addresses.polygon}</FanName>
                    </FanNameWrapper>
                </FanCard>

                <FanCard width={"45%"}>
                    <FanImage referrerPolicy="no-referrer" src={collectible.collection.image_url}/>
                    <FanNameWrapper>
                        <FanName color={colors.lightGrey} fontSize=".5em">Collection</FanName>
                        <FanName title={collectible.collection.name} color={colors.primaryLight}>{collectible.collection.name}</FanName>
                    </FanNameWrapper>
                </FanCard> 
            </FanWrapper>

            {/* {collectible.transaction ? <NFTDetailsWrapper margin="0 0 1em 0">

                <Flex>
                    <Text color={colors.lightGrey} fontSize=".8em" margin="0 .5em 0" fontWeight="400">Date Earned</Text>
                    <Text fontSize=".8em"  fontWeight="400">{new Date(collectible.created).toLocaleDateString()}</Text>
                </Flex>

                <Flex>
                    <Text color={colors.lightGrey} fontSize=".8em"  fontWeight="400" margin="0 .5em 0">Edition</Text>
                    <Text fontSize=".8em"  fontWeight="400">#1</Text>
                </Flex>                    

                <Flex>
                    <Text color={colors.lightGrey} fontSize=".8em" fontWeight="400" margin="0 .5em 0">Collection</Text>
                    <Text fontSize=".8em"  fontWeight="400">Radia NFT</Text>
                </Flex>
            
                {collectible.transaction.transaction.receipt.contractAddress ? <Flex>
                    <Text color={colors.lightGrey} fontSize=".8em"  fontWeight="400" margin="0 .5em 0">Contract Address</Text>
                    <Text fontSize=".8em"  fontWeight="400">
                        {`${collectible.transaction.transaction.receipt.contractAddress?.slice(0, 6)}
                        ...
                        ${collectible.transaction.transaction.receipt.contractAddress?.slice(collectible.transaction.transaction.receipt.contractAddress?.length-6, 
                        collectible.transaction.transaction.receipt.contractAddress?.length)}`}
                        </Text> 
                </Flex> : null}
                
            </NFTDetailsWrapper> : null}     */}
        
        </CollectibleTextWrapper>
      
    </CollectibleDetailsWrapper>
)


export default Details;