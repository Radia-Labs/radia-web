import {
    ArtistWrapper,
    ArtistImage, 
    ArtistName,
    LetterAvatar
} from "./styles";

import {Box} from './styles'

type Props = {
    artistImage: string,
    artistName: string,
    onClick: () => void
}
const Artist = ({ artistImage, artistName, onClick }: Props) => (
    <ArtistWrapper onClick={onClick}>
        <Box textAlign="center">
            {artistImage ? <ArtistImage image={artistImage}/> : <LetterAvatar name={artistName}/>}
            <ArtistName title={artistName}>{artistName}</ArtistName>
        </Box>
    </ArtistWrapper>
)


export default Artist;