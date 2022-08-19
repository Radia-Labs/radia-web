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
    collectibleImage: string,
    collectibleName: string,
    collectorImage: string,
    collectorName: string
}
const Collectible = ({ collectibleImage, collectibleName, collectorImage, collectorName }: Props) => (
    <CollectibleCard>
        <CollectibleImage image={collectibleImage}/>
        <CollectibleName title={collectibleName}>{collectibleName}</CollectibleName>
        <Flex justifyContent="flex-start">
            <CollectorImage referrerPolicy="no-referrer" src={collectorImage}/>
            <Flex margin="auto 10px" flexDirection="column" alignItems="flex-start">
                <CollectorLabel>Collector</CollectorLabel>
                <CollectorName>{collectorName}</CollectorName>
            </Flex>
        </Flex>            
    </CollectibleCard>
)


export default Collectible;