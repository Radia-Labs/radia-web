
import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    getArtist,
    getArtistCollectibles,
    getArtistCollectors,
    getCollectibles,
    getSpotifyUser,
    getSimilarArtists
  } from "../utils";
import {Flex} from '../styles';
import {H1, Box, Text} from '../Components/styles';
import {colors} from '../constants';
import SimilarArtist from '../Components/SimilarArtist';
import SimilarArtists from '../Components/SimilarArtists';
import ArtistProfileHeader from '../Components/ArtistProfileHeader';
import ArtistTopFans from '../Components/ArtistTopFans';
import ArtistTopAchievements from '../Components/ArtistTopAchievements';
import ArtistRecentlyEarned from '../Components/ArtistRecentlyEarned';
import {Artist} from '../Models/Artist';
import { useCurrentUser } from "../Providers/Auth"
import { MEDIA_CDN_HOST } from '../constants';

function ArtistProfile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [artist, setArtist] = useState<Artist| undefined>();
    const [similarArtists, setSimilarArtists] = useState<object[]>();
    const [collectibles, setCollectibles] = useState<{Items:any, Count:Number}| undefined>();
    const [collectors, setCollectors] = useState<Number| undefined>();
    const [topAchievements, setTopAchievements] = useState<object[]| undefined>();
    const [recentlyEarned, setRecentlyEarned] = useState<object[]| undefined>();
    const [topFans, setTopFans] = useState<object[]| undefined>();
    const params = useParams();
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            const _artist = await getArtist(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string);
            setArtist(_artist.Items[0] as Artist)               

            getArtistCollectibles(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string)
            .then(_collectibles => setCollectibles(_collectibles))
            
            // This might not scale well as we grow. Move this process to a scheduled lambda eventually.
            getArtistCollectors(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string)
            .then(_collectors => {
                setCollectors(_collectors.Count)
                const topFans = _collectors.Items.sort((a:{collectibleCount: number},b:{collectibleCount:number}) => a.collectibleCount - b.collectibleCount);
                setTopFans(topFans.slice(0,12))                
            })

            getCollectibles(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string)
            .then(allCollectibles => {
                const filteredCollectibles = allCollectibles.Items.filter((collectible:{artist:{id:string},sk:string}) => collectible.artist.id === params.id && !collectible.sk.includes('streamedMilliseconds') && "transaction" in collectible);
                const sortedTopAchievements = filteredCollectibles.sort((a:{streamedMilliseconds:number}, b:{streamedMilliseconds:number}) => (a.streamedMilliseconds > b.streamedMilliseconds) ? 1 : -1)
                setTopAchievements(sortedTopAchievements.slice(0, 4))
                const sortedRecentlyEarned = filteredCollectibles.sort((a:{created:number}, b:{created:number}) => (a.created > b.created) ? 1 : -1)
                setRecentlyEarned(sortedRecentlyEarned)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
            
            
            const spotify = await getSpotifyUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string);
            const _similarArtists = await getSimilarArtists(currentUser?.idToken as string, currentUser?.appPubKey as string, params.id as string, spotify.Items[0].refresh_token);
            setSimilarArtists(_similarArtists.artists.slice(0, 4))               

            
        }

        if (!artist && currentUser)
            init()
    }, [currentUser])

    const goToSpotify = () => {
        window.open(artist?.external_urls.spotify, '_blank');
    }

    const goToCollectible = (sk:string) => {
        navigate(`/collectible/${sk}`)
    }          

    const renderEmptyAchievements = () => {
        return (
            <Box margin="0 0 5em 0">
            <H1 fontsize="1.5em">Top Achievements</H1>
            <Flex justifyContent="flex-start" alignItems="flex-start" >
                <SimilarArtist
                key={1}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={`${MEDIA_CDN_HOST}/ready-to-claim.png`}
                collectibleName={`1 Hour Streamed of ${artist?.name}`}
                goToCollectible={goToCollectible}
                /> 
                <SimilarArtist
                key={2}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={`${MEDIA_CDN_HOST}/ready-to-claim.png`}
                collectibleName={`5 Hours Streamed of ${artist?.name}`}
                goToCollectible={goToCollectible}
                />     

                <SimilarArtist
                key={3}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={`${MEDIA_CDN_HOST}/ready-to-claim.png`}
                collectibleName={`10 Hours Streamed of ${artist?.name}`}
                goToCollectible={goToCollectible}
                />     

                <SimilarArtist
                key={4}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={`${MEDIA_CDN_HOST}/ready-to-claim.png`}
                collectibleName={`15 Hours Streamed of ${artist?.name}`}
                goToCollectible={goToCollectible}
                />                                              
                
                {/* <SimilarArtist
                key={5}
                collectibleId={collectibles?.Items[0].sk}
                collectibleImage={`${MEDIA_CDN_HOST}/ready-to-claim.png`}
                collectibleName={`25 Hours Streamed of ${artist?.name}`}
                goToCollectible={goToCollectible}
                />         */}
                            
            
            </Flex>
            </Box>

        )
    }

    const renderEmptyTopFans = () => {
        return (
        <Box margin="0 0 5em 0">
            <H1 fontsize="1.5em">Top Fans</H1>
            <Text fontSize="1em" fontWeight="400">This artist does not have any Top Fans yet.
            <br/>
            <Text cursor="pointer" fontSize="1em" fontWeight="400" color={colors.seaGreen} onClick={goToSpotify}>Click here</Text> to stream and be the first!</Text>
        </Box>
        )
    }

    return (
        <>
        <ArtistProfileHeader artist={artist as Artist} collectibles={collectibles?.Count as Number} collectors={collectors as Number}/>
        {topFans?.length && !loading ? <ArtistTopFans topFans={topFans}/> : !loading && renderEmptyTopFans()}
        {topAchievements?.length && !loading ? <ArtistTopAchievements topAchievements={topAchievements as object[]}/> : !loading && renderEmptyAchievements()}
        <ArtistRecentlyEarned recentlyEarned={recentlyEarned as object[]}/>
        {similarArtists ? <SimilarArtists similarArtists={similarArtists as any} /> : null}
        
        </>
    )
}

export default ArtistProfile;