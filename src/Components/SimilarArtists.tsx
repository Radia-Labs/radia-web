import {Flex} from "../styles";
import {SimilarArtistTitle, SimilarArtistWrapper} from './styles';
import SimilarArtist from '../Components/SimilarArtist';

type Props = {
    similarArtists: Array<{ name: string, images: Array<{url:string}>, external_urls: {spotify: string} }>
}

const SimilarArtists = ({similarArtists}: Props) => {
  
    return (
        similarArtists?.length ? <SimilarArtistWrapper>
            <SimilarArtistTitle fontSize="1.5rem" >You Might Be Interested In</SimilarArtistTitle>
            <Flex justifyContent="flex-start" alignItems="left">

            {similarArtists?.map((artist:any) => {
                return <SimilarArtist
                key={artist.id}
                collectibleId={artist.id}
                collectibleImage={artist.images[0]?.url}
                collectibleName={`${artist.name} - 1 Hour Streamed`}
                />
            })}
            </Flex>
        </SimilarArtistWrapper> : null
    )
}


export default SimilarArtists;

