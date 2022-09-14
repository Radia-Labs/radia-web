import {Flex} from "../styles";
import {SimilarArtistTitle, SimilarArtistWrapper} from './styles';
import SimilarArtist from '../Components/SimilarArtist';
import { useNavigate } from 'react-router-dom';

type Props = {
    similarArtists: Array<{ name: string, images: Array<{url:string}>, external_urls: {spotify: string} }>
}

const SimilarArtists = ({similarArtists}: Props) => {
    const navigate = useNavigate();
  
    const goToCollectible = (sk:string) => {
        navigate(`/collectible/${sk}`)
    }      

    return (
        similarArtists?.length ? <SimilarArtistWrapper>
            <SimilarArtistTitle>You Might Be Interested In</SimilarArtistTitle>
            <Flex justifyContent="flex-start" alignItems="left">

            {similarArtists?.map((artist:any) => {
                return <SimilarArtist
                key={artist.id}
                collectibleId={artist.id}
                collectibleImage={artist.images[0]?.url}
                collectibleName={`${artist.name} - 1 Hour Streamed`}
                goToCollectible={goToCollectible}
                />
            })}
            </Flex>
        </SimilarArtistWrapper> : null
    )
}


export default SimilarArtists;

