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
    isSelected: boolean;
    collectorImage: string | undefined,
    setSelectedNFTs: (item:object) => void,
    selectedNFTs: string[]
}



const NFT = ({ nft, isSelected, collectorImage, setSelectedNFTs, selectedNFTs }: Props) => {

    return (
        <CollectibleCard onClick={() => setSelectedNFTs(nft)} isSelected={isSelected}>
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