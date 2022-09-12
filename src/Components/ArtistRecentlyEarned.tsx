import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import {Flex} from "../styles";
import {H1} from './styles';
import Pagination from './Pagination';
import { getCollectibles } from "../utils";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { 
    getCollectibleType
  } from "../utils";
import {User} from '../Models/User'
import Achievement from './Achievement';

type Props = {
    recentlyEarned: Array<object>
}

const RecentlyEarned = ({recentlyEarned}: Props) => {

    return (
        recentlyEarned?.length ? <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
            <H1 fontSize="1.5rem">Recently Earned</H1>
            <Flex justifyContent="flex-start" alignItems="left">

            {recentlyEarned?.map((collectible:any) => {
                const collectibleType = getCollectibleType(collectible);
                return <Achievement
                key={collectible.sk}
                collectibleId={collectible.sk}
                collectibleImage={collectible.transaction.nft.metadata.image}
                collectibleName={collectibleType as string}
                collectorImage={collectible.user?.profileImage}
                collectorName={collectible.user?.addresses.polygon}
                />
            })}
            </Flex>
        </Flex> : null
    )
}


export default RecentlyEarned;

