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
    collectibleId: string | undefined,
    collectibleImage: string | undefined,
    collectibleName: string | undefined,
    collectorImage: string | undefined,
    collectorName: string | undefined
}

const goToProfile = (event:any) => {
    // TODO: wire this up with global profiles eventually
    event.stopPropagation()
    window.location.href = "/account"
}

const goToCollectible = (id:string) => {
    window.location.href = `/collectible/${id}`
}

const Achievement = ({ collectibleId, collectibleImage, collectibleName, collectorImage, collectorName }: Props) => (
    <CollectibleCard onClick={() => goToCollectible(collectibleId as string)}>
        {collectibleImage ? <CollectibleImage image={collectibleImage}/> : <LetterCollectibleImage artistName={collectibleName}/>}
        <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
        <Flex justifyContent="flex-start">
            <CollectorImage referrerPolicy="no-referrer" src={collectorImage}/>
            <CollectorWrapper>
                <CollectorLabel>Collector</CollectorLabel>
                <CollectorName>{collectorName}</CollectorName>
            </CollectorWrapper>
        </Flex>            
    </CollectibleCard>
)


export default Achievement;