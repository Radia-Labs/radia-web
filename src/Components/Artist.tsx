import {
    ArtistWrapper,
    ArtistImage, 
    ArtistName,
    LetterAvatar
} from "./styles";

import {Flex} from '../styles'

type Props = {
    artistImage: string,
    artistName: string,
    onClick: () => void
}
const Artist = ({ artistImage, artistName, onClick }: Props) => (
    <ArtistWrapper onClick={onClick}>
        <Flex flexDirection="column">
            {artistImage ? <ArtistImage image={artistImage}/> : <LetterAvatar artistName={artistName}/>}
            <ArtistName title={artistName}>{artistName}</ArtistName>
        </Flex>
    </ArtistWrapper>
)


export default Artist;