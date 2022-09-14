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
import UpdateUserNameModalBody from '../Components/UpdateUserNameModalBody'
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [userNameLoading, setUserNameLoading] = useState(false);
    const [userName, setUserName] = useState<String| undefined>();
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();
    const [completedCollectibles, setCompletedCollectibles] = useState<number| undefined>();
    const [artistsSupported, setArtistsSupported] = useState<number| undefined>();
    const [isPrivateKeyModalOpen, setIsPrivateKeyModalOpen] = useState(false);
    const [isUpdateUserNameModalOpen, setIsUpdateUserNameModalOpen] = useState(false);
    const { currentUser, setCurrentUser } = useCurrentUser()
    const navigate = useNavigate();


    useEffect(() => {
        const init = async () => {
            setCreatedAt(currentUser?.created as any)
            setCurrentUser(currentUser as User)
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

    const fileToDataUri = (file:any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event:any) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
        })
    
      const onImageChange = function (e: any) {
        setLoading(true)
        const fileList = e.target.files;
        if (!fileList) return;
        
        fileToDataUri(fileList[0])
        .then(async (result:any) => {
            const formData = new FormData()
            const blob = await (await fetch(result)).blob();
            formData.append("file", blob as Blob, fileList[0].name);
            formData.forEach(file => console.log("File: ", file));
            const posted = await postImage(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, formData)
            if (posted.url) {
                console.log(posted.url)
                const data = {profileImage: posted.url}
                await updateUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, data)
                const obj = {...currentUser, profileImage: posted.url}
                setCurrentUser(obj as User)
                setLoading(false)
            }
        }).catch(err => setLoading(false))
    }

    const updateUserName = async () => {
        setUserNameLoading(true)
        const data = {userName: userName}
        await updateUser(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, data)
        const updatedUser = {...currentUser, userName: userName}
        setCurrentUser(updatedUser as User)
        setUserNameLoading(false)
        setIsUpdateUserNameModalOpen(false)
    }

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    return (
        <>
        {/* {loading && <Overlay>Loading...&nbsp;<Spinner/></Overlay>} */}
        <UserProfileHeader 
        loading={loading}
        user={currentUser as User} 
        setIsUpdateUserNameModalOpen={setIsUpdateUserNameModalOpen}
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
                isOpen={isUpdateUserNameModalOpen}
                onBackgroundClick={() => setIsUpdateUserNameModalOpen(false)}
                onEscapeKeydown={() => setIsUpdateUserNameModalOpen(false)}>
                <UpdateUserNameModalBody loading={userNameLoading} userName={currentUser?.name} updateUserName={updateUserName} handleUserNameChange={handleUserNameChange}/>
            </StyledModal> 

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