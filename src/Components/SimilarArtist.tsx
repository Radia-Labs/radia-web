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
    goToCollectible: (sk:string) => void
}

const SimilarArtist = ({ collectibleId, collectibleImage, collectibleName, goToCollectible}: Props) => {


    return (
    <SimilarArtistCard onClick={() => goToCollectible(collectibleId as string)}>
        {collectibleImage ? <CollectibleImage image={collectibleImage} /> : <LetterCollectibleImage artistName={collectibleName} />}
        <CollectibleName title={collectibleName} >{collectibleName}</CollectibleName>
    </SimilarArtistCard>
    )
}


export default SimilarArtist;