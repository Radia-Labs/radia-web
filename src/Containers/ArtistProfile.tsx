
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { 
    getArtist,
    getArtistCollectibles,
    getArtistCollectors,
    getArtistCollectiblesBySk
  } from "../utils";
import ArtistProfileHeader from '../Components/ArtistProfileHeader';
import ArtistTopFans from '../Components/ArtistTopFans';
import ArtistTopAchievements from '../Components/ArtistTopAchievements';
import {Artist} from '../Models/Artist';

function ArtistProfile() {
    const [artist, setArtist] = useState<Artist| undefined>();
    const [collectibles, setCollectibles] = useState<Number| undefined>();
    const [collectors, setCollectors] = useState<Number| undefined>();
    const [topAchievements, setTopAchievements] = useState<object[]| undefined>();
    const [topFans, setTopFans] = useState<object[]| undefined>();
    const params = useParams();

    useEffect(() => {
        const init = async () => {
            const _artist = await getArtist(params.id as string);
            setArtist(_artist.Items[0] as Artist)

            const _collectibles = await getArtistCollectibles(params.id as string);
            setCollectibles(_collectibles.Count) // TODO: might need to add + 5 here to account for each streamed duration
            
            // This might not scale well as we grow. Move this process to a scheduled lambda eventually.
            const _collectors = await getArtistCollectors(params.id as string);
            setCollectors(_collectors.Count)

            const topFans = _collectors.Items.sort((a:{collectibleCount: number},b:{collectibleCount:number}) => a.collectibleCount - b.collectibleCount);
            setTopFans(topFans.slice(0,12))

            const allCollectibles = await getArtistCollectiblesBySk(`Collectible|spotify|streamedMilliseconds|${params.id}` as string);
            const filteredCollectibles = allCollectibles.Items.filter((collectible:{streamedMilliseconds:number}) => collectible.streamedMilliseconds > 3600000);
            const sortedTopAchievements = filteredCollectibles.sort((a:{streamedMilliseconds:number}, b:{streamedMilliseconds:number}) => (a.streamedMilliseconds > b.streamedMilliseconds) ? 1 : -1)
            setTopAchievements(sortedTopAchievements.slice(0, 4))

        }

        if (!artist)
            init()
    }, [])

    return (
        <>
        <ArtistProfileHeader artist={artist as Artist} collectibles={collectibles as Number} collectors={collectors as Number}/>
        <ArtistTopFans topFans={topFans}/>
        <ArtistTopAchievements topAchievements={topAchievements as object[]}/>
        </>
    )
}

export default ArtistProfile;