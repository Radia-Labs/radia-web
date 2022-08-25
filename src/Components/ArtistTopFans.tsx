import {H1, FanCard, FanImage, FanNameWrapper, FanName} from './styles'

type Props = {
    topFans: object[] | undefined
}
function ArtistTopFans({topFans}: Props) {
    return (
        <>
        <H1 fontSize="1.5rem">Top Fans</H1>
        {topFans && topFans.map((fan:any, index) => {
            return (
                <FanCard >
                    <FanImage referrerPolicy="no-referrer" src={fan.user.profileImage}/>
                    <FanNameWrapper>
                        <FanName>{fan.user.addresses.polygon}</FanName>
                        <FanName>{fan.collectibleCount} {fan.collectibleCount > 1 ? 'Collectibles' : 'Collectible'}</FanName>
                    </FanNameWrapper>
                    
                </FanCard>
            )
        })}
        </>
    )

}

export default ArtistTopFans