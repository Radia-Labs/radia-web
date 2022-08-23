import {
    CollectibleCard, 
    CollectibleImage, 
    CollectibleName,
    CollectorImage,
    CollectorLabel,
    CollectorName,
} from "./styles";

import {Flex} from '../styles'

type Props = {
    collectibleImage: string | undefined,
    collectibleName: string | undefined,
    collectorImage: string | undefined,
    collectorName: string | undefined
}

const goToMyProfile = () => {
    window.location.href = "/account"
}

const Collectible = ({ collectibleImage, collectibleName, collectorImage, collectorName }: Props) => (
    <CollectibleCard>
        <CollectibleImage image={collectibleImage}/>
        <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
        <Flex justifyContent="flex-start">
            <CollectorImage referrerPolicy="no-referrer" src={collectorImage} onClick={goToMyProfile}/>
            <Flex margin="auto 10px" flexDirection="column" alignItems="flex-start">
                <CollectorLabel>Collector</CollectorLabel>
                <CollectorName onClick={goToMyProfile}>{collectorName}</CollectorName>
            </Flex>
        </Flex>            
    </CollectibleCard>
)


export default Collectible;