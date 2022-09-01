import { useNavigate } from 'react-router-dom'
import {
    LetterCollectibleImage,
    ProgressCard, 
    CollectibleImage, 
    CollectibleName,
    CollectorImage,
    CollectorLabel,
    CollectorName,
    CollectorWrapper,
    ProgressBarContainer,
    ProgressBarBackground,
    Progress,
    Text
} from "./styles";

import {Flex} from '../styles'

type Props = {
    collectibleId: string | undefined,
    collectibleImage: string | undefined,
    collectibleName: string | undefined,
    collectorImage: string | undefined,
    collectorName: string | undefined,
    progress: string | undefined
}



const Collectible = ({ collectibleId, collectibleImage, collectibleName, collectorImage, collectorName, progress }: Props) => {
    const navigate = useNavigate()

    const goToMyProfile = (event:any) => {
        event.stopPropagation()
        navigate("/account")
    }
    
    const goToCollectible = (sk:string) => {
        navigate(`/collectible/${sk}`)
    }    

    return (
    <ProgressCard onClick={() => goToCollectible(collectibleId as string)}>
        {collectibleImage ? <CollectibleImage image={collectibleImage} filter="saturate(0%)"/> : <LetterCollectibleImage artistName={collectibleName} filter="saturate(0%)"/>}
        <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
        
            <Flex margin="0 0 1em 0" justifyContent="flex-start">
                <CollectorImage referrerPolicy="no-referrer" src={collectorImage} onClick={goToMyProfile}/>
                <CollectorWrapper>
                    <CollectorLabel>Collector</CollectorLabel>
                    <CollectorName onClick={goToMyProfile}>{collectorName}</CollectorName>
                </CollectorWrapper>
            </Flex>       
            <Flex flexWrap="nowrap">
                <ProgressBarContainer>
                    <ProgressBarBackground />
                    <Progress percent={progress} />
                </ProgressBarContainer>       
                <Text fontSize=".8em">{`${progress}%`}</Text>      
            </Flex>
    </ProgressCard>
    )
}


export default Collectible;