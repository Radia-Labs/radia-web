import {H1, FanCard, FanImage, FanNameWrapper, FanName, TopFansWrapper, LetterAvatarSm} from './styles'
import {Flex} from '../styles'

type Props = {
    topFans: object[] | undefined
}
function ArtistTopFans({topFans}: Props) {
    return (
        <TopFansWrapper>
        <H1 fontSize="1.5rem">Top Fans</H1>
        <Flex alignItems="center" justifyContent="flex-start">
            {topFans && topFans.map((fan:any, index) => {
                return (
                    <FanCard key={fan.sk} margin="0 1em 1em 0">
                        {fan.user.profileImage ? <FanImage referrerPolicy="no-referrer" src={fan.user.profileImage}/> :  <LetterAvatarSm name={'0x'} margin="0 1em 0 0"/>}
                        <FanNameWrapper>
                            <FanName>{fan.user.addresses.polygon}</FanName>
                            <FanName>{fan.collectibleCount} {fan.collectibleCount > 1 ? 'Collectibles' : 'Collectible'}</FanName>
                        </FanNameWrapper>
                        
                    </FanCard>
                )
            })}
        </Flex>
        </TopFansWrapper>
    )

}

export default ArtistTopFans