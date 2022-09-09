import {Flex} from "../styles";
import {H1} from './styles';
import Achievement from './Achievement';
import { 
  getCollectibleType
} from "../utils";
type Props = {
    topAchievements: Array<object>
}
const ArtistTopAchievements = ({topAchievements}: Props) => {
    
    return (
        <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">

            <H1 fontSize="1.5rem">Top Achievements</H1>
   
            <Flex justifyContent="flex-start" alignItems="left">

            {topAchievements?.map((collectible:any) => {
                const collectibleType = getCollectibleType(collectible);
                return <Achievement
                key={collectible.sk}
                collectibleId={collectible.sk}
                collectibleImage={collectible.artist.images[0]?.url}
                collectibleName={collectibleType as string}
                collectorImage={collectible.user?.profileImage}
                collectorName={collectible.user?.addresses.polygon}
                />
            })}
            </Flex>
        </Flex>
    )
}


export default ArtistTopAchievements;

