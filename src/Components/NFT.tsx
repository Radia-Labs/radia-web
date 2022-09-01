import {
    LetterCollectibleImage,
    CollectibleCard, 
    CollectibleImage, 
    CollectibleName,
    CollectorImage,
    CollectorLabel,
    CollectorName,
    CollectorWrapper
} from "./styles";

import {Flex} from '../styles'

type Props = {
    nft: {
        image_url: string;
        name: string;
        owners: Array<{
            owner_address: string;
        }>;
    };
    collectorImage: string | undefined,
    setSelectedNFTs: (item:object) => void,
    selectedNFTs: string[]
}



const NFT = ({ nft, collectorImage, setSelectedNFTs, selectedNFTs }: Props) => {

    function containsObject(obj:object, list:object[]) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
    
        return false;
    }

    return (
        <CollectibleCard onClick={() => setSelectedNFTs(nft)} isSelected={containsObject(nft, selectedNFTs as [])}>
            <CollectibleImage image={nft.image_url}/>
            <CollectibleName title={nft.name} >{nft.name}</CollectibleName>
            <Flex justifyContent="flex-start">
                <CollectorImage referrerPolicy="no-referrer" src={collectorImage}/>
                <CollectorWrapper>
                    <CollectorLabel>Collector</CollectorLabel>
                    <CollectorName>{nft.owners[0].owner_address}</CollectorName>
                </CollectorWrapper>
            </Flex>            
        </CollectibleCard>
    )
}


export default NFT;