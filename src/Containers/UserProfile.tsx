import {useState, useEffect} from 'react';
import { useWeb3Auth } from "../Services/web3auth";
import {
    getCollectibles,
  } from "../utils";
import {User} from '../Models/User';  
import { toast } from 'react-toastify';
import UserProfileHeader from '../Components/UserProfileHeader';
import InProgress from '../Components/InProgress';
import TopArtists from '../Components/TopArtists';
import RecentlyEarned from '../Components/RecentlyEarned';
import { useCurrentUser } from "../Providers/Auth"


function UserProfile() {

    const { provider, logout, web3Auth } = useWeb3Auth();
    const [user, setUser] = useState<User| undefined>();
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();
    const [completedCollectibles, setCompletedCollectibles] = useState<number| undefined>();
    const [artistsSupported, setArtistsSupported] = useState<number| undefined>();
    const { currentUser } = useCurrentUser()


    useEffect(() => {
        const init = async () => {
            setCreatedAt(currentUser?.created as any)
            setUser(currentUser as User)
            setWalletAddress(currentUser?.addresses.polygon)

            const allCollectibles = await getCollectibles(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
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

        if (currentUser)
            init()
    }, [currentUser])

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
        <button onClick={_logout}>logout</button>
        <InProgress/>
        <TopArtists/>
        <RecentlyEarned/>
        </>

    )
}

export default UserProfile;