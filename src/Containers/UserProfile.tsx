import {useState, useEffect} from 'react';
import {
    getCollectibles,
  } from "../utils";
import {User} from '../Models/User';  
import { toast } from 'react-toastify';
import UserProfileHeader from '../Components/UserProfileHeader';
import ReadyToClaim from '../Components/ReadyToClaim';
import InProgress from '../Components/InProgress';
import TopArtists from '../Components/TopArtists';
import RecentlyEarned from '../Components/RecentlyEarned';
import Collections from '../Components/Collections';
import { useCurrentUser } from "../Providers/Auth"
import { ModalProvider } from 'styled-react-modal'
import {StyledModal} from '../styles';
import PrivateKeyModalBody from '../Components/PrivateKeyModalBody';

function UserProfile() {

    const [user, setUser] = useState<User| undefined>();
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();
    const [completedCollectibles, setCompletedCollectibles] = useState<number| undefined>();
    const [artistsSupported, setArtistsSupported] = useState<number| undefined>();
    const [isPrivateKeyModalOpen, setIsPrivateKeyModalOpen] = useState(false);
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

    const exportPrivateKey = () => {
        setIsPrivateKeyModalOpen(true)
        console.log("here?")
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
        <ReadyToClaim/>
        <InProgress/>
        <TopArtists/>
        <Collections/>
        <RecentlyEarned/>
        <ModalProvider>
            <StyledModal
                isOpen={isPrivateKeyModalOpen}
                onBackgroundClick={() => setIsPrivateKeyModalOpen(false)}
                onEscapeKeydown={() => setIsPrivateKeyModalOpen(false)}>
                <PrivateKeyModalBody setIsPrivateKeyModalOpen={setIsPrivateKeyModalOpen}/>
            </StyledModal> 
        </ModalProvider>        
        </>

    )
}

export default UserProfile;