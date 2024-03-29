import {
    LetterCollectibleImage,
    CollectibleCard, 
    CollectibleImage, 
    CollectibleName,
    CollectorImage,
    CollectorLabel,
    CollectorName,
    CollectorWrapper,
    LetterAvatarSm,
    Chip
} from "./styles";

import {Flex} from '../styles'
import { colors } from "../constants";
import { useNavigate } from "react-router-dom";

type Props = {
    collectibleId: string | undefined,
    collectibleImage: string | undefined,
    collectibleName: string | undefined,
    collectorImage: string | undefined,
    collectorName: string | undefined,
    showChip?: boolean
}



const Achievement = ({ collectibleId, collectibleImage, collectibleName, collectorImage, collectorName, showChip }: Props) => {
    const navigate = useNavigate();

    const goToCollectible = (id:string) => {
        navigate(`/collectible/${id}`)
    }    

    return (
        <CollectibleCard onClick={() => goToCollectible(collectibleId as string)}>
            {collectibleImage ? <CollectibleImage image={collectibleImage}/> : <LetterCollectibleImage name={collectibleName}/>}
            <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
            <Flex justifyContent="flex-start" >
            {collectorImage ? <CollectorImage referrerPolicy="no-referrer" src={collectorImage}/> : <LetterAvatarSm name={'0x'} />}
                <CollectorWrapper>
                    <CollectorLabel>Collector</CollectorLabel>
                    <CollectorName>{collectorName}</CollectorName>
                </CollectorWrapper>
                { showChip ? <Chip 
                backgroundColor="transparent" 
                color={colors.seaGreen} 
                border={`1px solid ${colors.seaGreen}`}>Ready To Claim</Chip> : null}
            </Flex>            
        </CollectibleCard>
    )
}


export default Achievement;