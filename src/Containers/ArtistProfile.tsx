
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { 
    getArtist,
    getArtistCollectibles,
    getArtistCollectors,
    getArtistCollectiblesBySk
  } from "../utils";
import {Flex} from '../styles';
import {H1, Box} from '../Components/styles';
import {colors} from '../constants';
import SimilarArtist from '../Components/SimilarArtist';
import ArtistProfileHeader from '../Components/ArtistProfileHeader';
import ArtistTopFans from '../Components/ArtistTopFans';
import ArtistTopAchievements from '../Components/ArtistTopAchievements';
import ArtistRecentlyEarned from '../Components/ArtistRecentlyEarned';
import {Artist} from '../Models/Artist';
import { useCurrentUser } from "../Providers/Auth"

function ArtistProfile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [artist, setArtist] = useState<Artist| undefined>();
    const [collectibles, setCollectibles] = useState<{Items:any, Count:Number}| undefined>();
    const [collectors, setCollectors] = useState<Number| undefined>();
    const [topAchievements, setTopAchievements] = useState<object[]| undefined>();
    const [recentlyEarned, setRecentlyEarned] = useState<object[]| undefined>();
    const [topFans, setTopFans] = useState<object[]| undefined>();
    const params = useParams();
    const { currentUser } = useCurrentUser()

    useEffect(() => {
        const init = async () => {
            setLoading(true)

            const _artist = await getArtist(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string);
            setArtist(_artist.Items[0] as Artist)

            const _collectibles = await getArtistCollectibles(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string);
            setCollectibles(_collectibles)
            console.log(_collectibles)
            
            // This might not scale well as we grow. Move this process to a scheduled lambda eventually.
            const _collectors = await getArtistCollectors(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string);
            setCollectors(_collectors.Count)

            const topFans = _collectors.Items.sort((a:{collectibleCount: number},b:{collectibleCount:number}) => a.collectibleCount - b.collectibleCount);
            setTopFans(topFans.slice(0,12))
            console.log(topFans)

            const allCollectibles = await getArtistCollectiblesBySk(currentUser?.idToken as string, currentUser?.appPubKey as string, `Collectible|spotify|streamedMilliseconds|${params.id}` as string);
            const filteredCollectibles = allCollectibles.Items.filter((collectible:{streamedMilliseconds:number}) => collectible.streamedMilliseconds > 3600000);
            const sortedTopAchievements = filteredCollectibles.sort((a:{streamedMilliseconds:number}, b:{streamedMilliseconds:number}) => (a.streamedMilliseconds > b.streamedMilliseconds) ? 1 : -1)
            setTopAchievements(sortedTopAchievements.slice(0, 4))

            const sortedRecentlyEarned = filteredCollectibles.sort((a:{created:number}, b:{created:number}) => (a.created > b.created) ? 1 : -1)
            setRecentlyEarned(sortedRecentlyEarned)
            
            setLoading(false)

        }

        if (!artist && currentUser)
            init()
    }, [currentUser])

    // const goToSpotify = () => {
    //     console.log(artist)
    // }

    // const renderEmpty = () => {        
    //     return (
    //       <Box
    //         padding="1em"
    //         borderRadius="1em"
    //         border={`1px solid ${colors.primaryLight}`}
    //       >
    //         <Text fontSize=".8">Be the first! <Text fontSize=".8" cursor="pointer" color={colors.brightGreen} onClick={goToSpotify}>Click here </Text>to start earning.</Text>
    //       </Box >
    //     )
    //   }    

    const renderAchievements = () => {
        return (
            <Box>
            <H1 fontsize="1.5em">Top Achievements</H1>
            <Flex justifyContent="flex-start" alignItems="flex-start" >
                <SimilarArtist
                key={collectibles?.Items[0].sk}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={artist?.images[0]?.url}
                collectibleName={`${artist?.name} - 1 Hour Streamed`}
                /> 
                <SimilarArtist
                key={collectibles?.Items[0].sk}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={artist?.images[0]?.url}
                collectibleName={`${artist?.name} - 5 Hours Streamed`}
                />     

                <SimilarArtist
                key={collectibles?.Items[0].sk}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={artist?.images[0]?.url}
                collectibleName={`${artist?.name} - 10 Hours Streamed`}
                />     

                <SimilarArtist
                key={collectibles?.Items[0].sk}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={artist?.images[0]?.url}
                collectibleName={`${artist?.name} - 15 Hours Streamed`}
                />                                              
                
                <SimilarArtist
                key={collectibles?.Items[0].sk}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={artist?.images[0]?.url}
                collectibleName={`${artist?.name} - 25 Hours Streamed`}
                />                   
            
            </Flex>
            </Box>

        )
    }

    return (
        <>
        <ArtistProfileHeader artist={artist as Artist} collectibles={collectibles?.Count as Number} collectors={collectors as Number}/>
        {topFans?.length && !loading ? <ArtistTopFans topFans={topFans}/> : null}
        {topAchievements?.length && !loading ? <ArtistTopAchievements topAchievements={topAchievements as object[]}/> : !loading && renderAchievements()}
        <ArtistRecentlyEarned recentlyEarned={recentlyEarned as object[]}/>
        </>
    )
}

export default ArtistProfile;