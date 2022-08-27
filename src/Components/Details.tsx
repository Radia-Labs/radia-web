import {
    CollectibleDetailsWrapper,
    CollectibleDetailsImage,
    FanCard,
    FanImage,
    FanName,
    FanNameWrapper,
    NFTDetailsWrapper,
    RadiaButton,
    Text
} from "./styles";

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
            transaction: {
                receipt: {contractAddress: string | undefined}}
            }
        
    }
}

function getCollectibleType(collectible:any) {
    let acheivement 
    if (collectible.achievement === 'streamedMilliseconds')
        acheivement = getCurrentAcheivement(collectible)
    else
        acheivement = getEarnedAcheivement(collectible)
    return `${collectible.artist.name} - ${acheivement}`    
  }

function getCurrentAcheivement(collectible:any) {

    console.log("In Progress!!")
        
if (collectible.streamedMilliseconds <= 3600000 ) {
    return '1 Hour Streamed'
}

if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
    return '5 Hours Streamed'
}  

if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
    return '10 Hours Streamed'
}       

if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
    return '15 Hours Streamed'
}        

if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <= 3600000 * 25) {
    return '25 Hours Streamed'
}     

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

const Details = ({collectible}: Props) => (
    <CollectibleDetailsWrapper>
        <CollectibleDetailsImage src={collectible.artist.images[0].url}/>
        <Flex flexDirection="column" >
            <Flex flexDirection="column" margin="0 0 0 3em" alignItems="flex-start">
                <Text fontSize="2em" margin="0 0 .5em 0">{getCollectibleType(collectible)}</Text>

                <Flex alignItems="flex-start" justifyContent="flex-start" margin="0 0 1em 0">

                    <FanCard width="40%" margin="0 1em 0 0">
                        <FanImage referrerPolicy="no-referrer" src={collectible.user.profileImage}/>
                        <FanNameWrapper>
                            <FanName color={colors.lightGrey} fontSize=".5em">
                            {collectible.transaction ? "Owned By" : "Earning By"}
                            
                            </FanName>
                            <FanName title={collectible.user.addresses.polygon.length ? collectible.user.addresses.polygon : collectible.user.name} color={colors.primaryLight}>{collectible.user.addresses.polygon.length ? collectible.user.addresses.polygon : collectible.user.name}</FanName>
                        </FanNameWrapper>
                    </FanCard>

                    <FanCard width="40%">
                        <FanImage referrerPolicy="no-referrer" src={collectible.user.profileImage}/>
                        <FanNameWrapper>
                            <FanName color={colors.lightGrey} fontSize=".5em">Artist</FanName>
                            <FanName title={collectible.artist.name} color={colors.primaryLight}>{collectible.artist.name}</FanName>
                        </FanNameWrapper>
                    </FanCard> 
                </Flex>

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
                
                    {collectible.transaction.transaction.receipt.contractAddress ? <Flex>
                        <Text color={colors.lightGrey} fontSize=".8em"  fontWeight="400" margin="0 .5em 0">Contract Address</Text>
                        <Text fontSize=".8em"  fontWeight="400">
                            {`${collectible.transaction.transaction.receipt.contractAddress?.slice(0, 6)}
                            ...
                            ${collectible.transaction.transaction.receipt.contractAddress?.slice(collectible.transaction.transaction.receipt.contractAddress?.length-6, 
                            collectible.transaction.transaction.receipt.contractAddress?.length)}`}
                            </Text> 
                    </Flex> : null}
                    
                </NFTDetailsWrapper> : null}    

                {!collectible.transaction ? <RadiaButton 
                background="transparent" 
                border={`1px solid ${colors.primaryLight}`} 
                width="100%" 
                padding="1em 5em"
                onClick={() => window.open(collectible.artist.external_urls.spotify, '_blank')}
                >Earn Collectible</RadiaButton> : null}
            
            </Flex>
        </Flex>
    </CollectibleDetailsWrapper>
)


export default Details;