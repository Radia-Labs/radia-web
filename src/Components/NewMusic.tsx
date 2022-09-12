import {Flex} from '../styles'
import {Text, SimilarArtistCard, CollectibleImage, LetterCollectibleImage} from './styles';
import { useNavigate } from 'react-router-dom'
import { colors } from '../constants';
type Props = {
    newMusic: Array<object>
}


const NewMusic = ({newMusic} : Props) =>  {
    const navigate = useNavigate()

    const goToArtistCollectible = (album:{artists:any}) => {
        navigate(`/collectible/${album.artists[0].id}`)
    }

    return (
    <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
        <Flex alignItems="flex-start" justifyContent="flex-start">
        {newMusic?.length ? newMusic.map((album:any) => {
            const artists = album.artists.map((artist:any) => artist.name).join(', ')
            const collectibleImage = album.images[0].url;
            return (<SimilarArtistCard key={album.id} onClick={() => goToArtistCollectible(album)}>
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

}
export default NewMusic;