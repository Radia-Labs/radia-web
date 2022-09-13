import {useState, useEffect} from 'react';
import {
    getCollectibles,
    postImage,
    updateUser
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
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User| undefined>();
    const [fileSelected, setFileSelected] = useState<File>() // also tried <string | Blob>
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();
    const [completedCollectibles, setCompletedCollectibles] = useState<number| undefined>();
    const [artistsSupported, setArtistsSupported] = useState<number| undefined>();
    const [isPrivateKeyModalOpen, setIsPrivateKeyModalOpen] = useState(false);
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate();


    useEffect(() => {
        const init = async () => {
            setLoading(true)
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
            setLoading(false)
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

    const fileToDataUri = (file:any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event:any) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
        })
    


      const onImageChange = function (e: any) {
        const fileList = e.target.files;
        if (!fileList) return;
        
        setFileSelected(fileList[0]);

        fileToDataUri(fileList[0])
        .then(async (result:any) => {
            console.log(result)
            const formData = new FormData()
            const blob = await (await fetch(result)).blob();
            console.log(blob)
            formData.append("file", blob as Blob, fileList[0].name);
            formData.forEach(file => console.log("File: ", file));
            console.log("posting...", formData)
            const posted = await postImage(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, formData)
            if (posted.url) {
                console.log(posted.url)
                const data = {profileImage: posted.url}
                await updateUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, data)
                navigate(0)
            }
        })
    }
       



    return (
        <>
        {/* {loading && <Overlay>Loading...&nbsp;<Spinner/></Overlay>} */}
        <UserProfileHeader 
        user={user as User} 
        walletAddress={walletAddress as string} 
        exportPrivateKey={exportPrivateKey} 
        handleCopy={handleCopy} 
        createdAt={createdAt as string}
        artistsSupported={artistsSupported as number}        
        totalCollectibles={completedCollectibles as number}
        onImageChange={onImageChange}
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