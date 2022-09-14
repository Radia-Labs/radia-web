
import {Flex} from '../styles';
import {
    H1,
    LetterProfileImage,
    ProfileHeader, 
    ProfileImage,
    ProfileUserName,
    ArtistPorifileWrapper
} from './styles';

import { colors } from '../constants';

type Props = {
    artist: {images: {url:string}[], name:string};
    collectors: Number;
    collectibles: Number;
}

function ArtistProfileHeader({artist, collectors, collectibles}: Props) {
    console.log(artist)
    return (
       artist ? <ProfileHeader>
            {artist && artist.images[0]?.url ? <ProfileImage disabled={true} src={artist.images[0]?.url}/> : artist && artist.name ?<LetterProfileImage text={artist.name} /> : null}
            <ArtistPorifileWrapper >
                
                <Flex width="100%" margin="0 0 0 2em" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
                    <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                        Artist Profile
                    </H1>
                    <ProfileUserName disabled={true}>
                        {artist?.name}
                    </ProfileUserName>
                </Flex>

                <Flex width="100%" margin="0 2em 0 2em" flexDirection="row" flexGrow=".5"  justifyContent="space-between" alignItems="center">

                    <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Collectors
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {collectors ? collectors : collectors === 0 ? 0 : '-'}
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em" flexDirection="column" flexGrow=".5"  justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Collectibles
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {collectibles ? collectibles as number + 4 : '-'}
                        </H1>                        
                    </Flex>
     
                </Flex>

            </ArtistPorifileWrapper>
        </ProfileHeader> : <></> 
    )
}

export default ArtistProfileHeader;