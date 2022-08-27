import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import { 
    getUser, 
    getCollectibles,
  } from "../utils";
import {User} from '../Models/User';  
import { toast } from 'react-toastify';
import UserProfileHeader from '../Components/UserProfileHeader';
import InProgress from '../Components/InProgress';
import TopArtists from '../Components/TopArtists';
import RecentlyEarned from '../Components/RecentlyEarned';

import { getPublicCompressed } from "@toruslabs/eccrypto";

function UserProfile() {

    const { provider, logout, web3Auth } = useWeb3Auth();
    const [user, setUser] = useState<User| undefined>();
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();
    const [completedCollectibles, setCompletedCollectibles] = useState<number| undefined>();
    const [artistsSupported, setArtistsSupported] = useState<number| undefined>();

    useEffect(() => {
        const init = async () => {
            const authUser = await web3Auth?.getUserInfo();
            const appScopedPrivateKey = await provider?.getPrivateKey()
            const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");          
            const radiaUser = await getUser(authUser?.idToken as string, appPubKey as string, authUser?.verifierId as string)  
            setCreatedAt(radiaUser.Items[0].created)
            setUser(authUser as User)
            setWalletAddress(radiaUser.Items[0].addresses.polygon)

            const allCollectibles = await getCollectibles(authUser?.idToken as string, appPubKey as string, authUser?.verifierId as string);
            const completed = [];
            const supported:object[] = []
            allCollectibles.Items.map((collectible:{artist: object}) => {
                if ("transaction" in collectible) {
                    completed.push(collectible)
                    console.log(collectible.artist)
                    if (collectible.artist && !supported.includes(collectible.artist)) {
                        supported.push(collectible.artist)
                    }
                }
            })
            setCompletedCollectibles(completed.length)
            setArtistsSupported(supported.length)
        }
        init()
    }, [web3Auth, provider])

    const handleCopy = () => {
        toast("Address copied to clipboard");
    }

    const exportPrivateKey = async () => {
        const privateKey = await provider?.getPrivateKey()
        alert(privateKey)
    }    
    
    const _logout = async () => {
        logout()
    }

    return (
        <>
        <UserProfileHeader 
        user={user as User} 
        walletAddress={walletAddress as string} 
        exportPrivateKey={exportPrivateKey} 
        handleCopy={handleCopy} 
        createdAt={createdAt as string}
        artistsSupported={artistsSupported as number}        
        totalCollectibles={completedCollectibles as number}
        />
        {/* <button onClick={_logout}>logitu</button> */}
        <InProgress/>
        <TopArtists/>
        <RecentlyEarned/>
        </>

    )
}

export default UserProfile;