import {Flex} from "../styles";
import {H1} from './styles';
import Achievement from './Achievement';

type Props = {
    topAchievements: Array<object>
}
const ArtistTopAchievements = ({topAchievements}: Props) => {

      function getCollectibleType(collectible:any) {
        const currentAchievement = getEarnedAcheivement(collectible)
        return `${collectible.artist.name} - ${currentAchievement}`    
      }
    
      function getEarnedAcheivement(collectible:any) {
    
        if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
          return '1 Hour Streamed'
        }  
        
        if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
          return '5 Hours Streamed'
        }       
    
        if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
          return '10 Hours Streamed'
        }        
      
        if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <=3600000 * 25) {
          return '15 Hours Streamed'
        }     

        if (collectible.streamedMilliseconds >= 3600000 * 25) {
            return '25 Hours Streamed'
        }             
    
      }

    
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

