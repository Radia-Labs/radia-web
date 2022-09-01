
import {Flex} from '../styles';
import {
    H1,
    LetterProfileImage,
    ProfileHeader, 
    ProfileImage,
    ProfileUserName,
} from './styles';

import { colors } from '../constants';

type Props = {
    artist: {images: {url:string}[], name:string};
    collectors: Number;
    collectibles: Number;
}

function ArtistProfileHeader({artist, collectors, collectibles}: Props) {
    return (
       artist ? <ProfileHeader>
            {artist.images[0]?.url ? <ProfileImage image={artist.images[0]?.url}/> : <LetterProfileImage artistName={artist.name} />}
            <Flex margin="0 0 0 2em" flexDirection="row" flexGrow="1" justifyContent="space-between" alignItems="center">
                <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
                    <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                        Artist Profile
                    </H1>
                    <ProfileUserName>
                        {artist?.name}
                    </ProfileUserName>

                </Flex>

                <Flex margin="0 2em 0 2em" flexDirection="row" flexGrow=".5"  justifyContent="space-between" alignItems="center">

                    <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Collectors
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {collectors}
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em" flexDirection="column" flexGrow=".5"  justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Collectibles
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {collectibles as number + 4}
                        </H1>                        
                    </Flex>
     
                </Flex>

            </Flex>
        </ProfileHeader> : null 
    )
}

export default ArtistProfileHeader;