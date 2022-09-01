import {Flex} from "../styles";
import {H1} from './styles';
import SimilarArtist from '../Components/SimilarArtist';

type Props = {
    similarArtists: Array<{ name: string, images: Array<{url:string}>, external_urls: {spotify: string} }>
}

const SimilarArtists = ({similarArtists}: Props) => {
    
    function getCollectibleType(collectible:any) {
      const currentAchievement = getCurrentAcheivement(collectible)
      return `${collectible.artist.name} - ${currentAchievement}`    
    }
  
    function getCurrentAcheivement(collectible:any) {
          
      if (collectible.streamedMilliseconds <= 3600000 ) {
        return '1 Hour Streamed'
      }
  
      if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return '5 Hours Streamed'
      }  
      
      if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return '10 Hours Streamed'
      }       
  
      if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return '15 Hours Streamed'
      }        
    
      if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <= 3600000 * 25) {
        return '25 Hours Streamed'
      }     
  
    }

    const calculateProgress = (collectible:{streamedMilliseconds: number}) => {
      if (collectible.streamedMilliseconds <= 3600000 ) {
        return (collectible.streamedMilliseconds / 3600000).toFixed(0)
      }
  
      if (collectible.streamedMilliseconds >= 3600000 && collectible.streamedMilliseconds <= 3600000 * 5) {
        return (collectible.streamedMilliseconds / 3600000 * 5).toFixed(0)
      }  
      
      if (collectible.streamedMilliseconds >= 3600000 * 5 && collectible.streamedMilliseconds <= 3600000 * 10) {
        return (collectible.streamedMilliseconds / 3600000 * 10).toFixed(0)
      }       
  
      if (collectible.streamedMilliseconds >= 3600000 * 10 && collectible.streamedMilliseconds <= 3600000 * 15) {
        return (collectible.streamedMilliseconds / 3600000 * 15).toFixed(0)
      }        
    
      if (collectible.streamedMilliseconds >= 3600000 * 15 && collectible.streamedMilliseconds <= 3600000 * 25) {
        return (collectible.streamedMilliseconds / 3600000 * 25).toFixed(0)
      }  
    }
    
    return (
        similarArtists?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <Flex>
            <H1 fontSize="1.5rem" >You Might Be Interested In</H1>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="left">

            {similarArtists?.map((artist:any) => {
                return <SimilarArtist
                key={artist.id}
                collectibleId={artist.id}
                collectibleImage={artist.images[0]?.url}
                collectibleName={`${artist.name} - 1 Hour Streamed`}
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default SimilarArtists;

