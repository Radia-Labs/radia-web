import { useNavigate } from 'react-router-dom'
import {
    LetterCollectibleImage,
    SimilarArtistCard, 
    CollectibleImage, 
    CollectibleName,
} from "./styles";

type Props = {
    collectibleId: string,
    collectibleImage: string | undefined,
    collectibleName: string | undefined,
}

const SimilarArtist = ({ collectibleId, collectibleImage, collectibleName}: Props) => {
    const navigate = useNavigate()
    
    const goToCollectible = (sk:string) => {
        navigate(`/collectible/${sk}`)
    }    

    return (
    <SimilarArtistCard onClick={() => goToCollectible(collectibleId as string)}>
        {collectibleImage ? <CollectibleImage image={collectibleImage} /> : <LetterCollectibleImage artistName={collectibleName} />}
        <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
    </SimilarArtistCard>
    )
}


export default SimilarArtist;