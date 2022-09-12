import {
    CollectibleDetailsWrapper,
    CollectibleDetailsImage,
    CollectibleTextWrapper,
    CollectibleTitle,
    LetterAvatarSm,
    FanWrapper,
    FanCard,
    FanImage,
    FanName,
    FanNameWrapper,
    NFTDetailsWrapper,
    Button,
    Spinner,
    Text
} from "./styles";
import {
    getCollectibleType,
    generateCollectibleImage
} from "../utils";

import {Flex} from '../styles'
import { colors } from "../constants";

type Props = {
    collectible: {
        artist: {
            images: Array<{url:string}>,
            name: string,
            external_urls: {
                spotify: string
            }
        },
        user: {
            profileImage: string,
            addresses: {
                polygon: string
            },
            name: string
        },
        achievement: string,
        created: string,
        transaction: {
            receipt: {contractAddress: string | undefined}
        },
        status: string,   
    };

    claimCollectible: () => void;
    goToArtist: (collectible:object) => void;
    isMinting: boolean;
}



const Details = ({collectible, claimCollectible, goToArtist, isMinting}: Props) => (
    <CollectibleDetailsWrapper>
        <CollectibleDetailsImage image={generateCollectibleImage(collectible)}/>
        
        <CollectibleTextWrapper >
            <CollectibleTitle>{getCollectibleType(collectible)}</CollectibleTitle>

            <FanWrapper>

                {collectible.user && <FanCard width="45%" margin="0 1em 0 0">
                    {collectible.user.profileImage ? <FanImage referrerPolicy="no-referrer" src={collectible.user.profileImage}/> : <LetterAvatarSm margin="0 1em 0 0" name={'0x'} />}
                    <FanNameWrapper>
                        <FanName color={colors.lightGrey} fontSize=".5em">
                        {collectible.transaction ? "Owned By" : "Earning By"}
                        
                        </FanName>
                        <FanName title={collectible.user.addresses.polygon.length ? collectible.user.addresses.polygon : collectible.user.name} color={colors.primaryLight}>{collectible.user.addresses.polygon.length ? collectible.user.addresses.polygon : collectible.user.name}</FanName>
                    </FanNameWrapper>
                </FanCard> }

                <FanCard width={collectible.user ? "45%" : "100%"} onClick={() => goToArtist(collectible)}>
                    <FanImage referrerPolicy="no-referrer" src={collectible.artist.images[0].url}/>
                    <FanNameWrapper>
                        <FanName color={colors.lightGrey} fontSize=".5em">Artist</FanName>
                        <FanName title={collectible.artist.name} color={colors.primaryLight}>{collectible.artist.name}</FanName>
                    </FanNameWrapper>
                </FanCard> 
            </FanWrapper>

            {collectible.transaction ? <NFTDetailsWrapper margin="0 0 1em 0">

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
            
                {collectible.transaction.receipt.contractAddress ? <Flex>
                    <Text color={colors.lightGrey} fontSize=".8em"  fontWeight="400" margin="0 .5em 0">Contract Address</Text>
                    <Text fontSize=".8em"  fontWeight="400">
                        {`${collectible.transaction.receipt.contractAddress?.slice(0, 6)}
                        ...
                        ${collectible.transaction.receipt.contractAddress?.slice(collectible.transaction.receipt.contractAddress?.length-6, 
                        collectible.transaction.receipt.contractAddress?.length)}`}
                        </Text> 
                </Flex> : null}
                
            </NFTDetailsWrapper> : null}    

            {!collectible.transaction && !collectible.status ? 
            <Button 
            background="transparent" 
            border={`2px solid ${colors.primaryLight}`} 
            width="100%" 
            padding="1em 5em"
            onClick={() => window.open(collectible.artist.external_urls.spotify, '_blank')}
            >Earn Collectible</Button> : null}

            
            {collectible.status === 'readyToMint' ? 

            <Button 
            background="transparent" 
            color={colors.seaGreen}
            border={`2px solid ${colors.seaGreen}`}
            fontWeight="700"
            width="100%" 
            padding="1em 5em"
            onClick={claimCollectible}
            disabled={isMinting}
            >{!isMinting ? "Claim Collectible" : <Spinner/>}</Button>             
            
            : null}
        
        </CollectibleTextWrapper>
      
    </CollectibleDetailsWrapper>
)


export default Details;