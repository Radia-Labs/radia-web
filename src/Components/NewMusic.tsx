import {Flex} from '../styles'
import {H1, Text, SimilarArtistCard, CollectibleImage, LetterCollectibleImage} from './styles';
import {Artist} from '../Models/Artist'
import { colors } from '../constants';
type Props = {
    newMusic: Array<object>
}


const NewMusic = ({newMusic} : Props) =>  (
    <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
        <H1 fontSize="1.5rem">New Music Releases</H1>
        <Flex alignItems="flex-start" justifyContent="flex-start">
        {newMusic?.length ? newMusic.map((album:any) => {
            const artists = album.artists.map((artist:any) => artist.name).join(', ')
            const collectibleImage = album.images[0].url;
            return (<SimilarArtistCard>
                {collectibleImage ? <CollectibleImage image={collectibleImage} /> : <LetterCollectibleImage artistName={artists} />}
                <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                    <Text fontSize=".5em" color={colors.lightGrey} title={artists} >{artists}</Text>
                    <Text fontSize=".8em" title={artists} >{album.name}</Text>
                </Flex>
            </SimilarArtistCard>)
        }) : null}
        </Flex>
    </Flex>

)
export default NewMusic;