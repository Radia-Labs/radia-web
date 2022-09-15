import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useWeb3Auth } from "../Services/web3auth";

import {Flex} from '../styles';
import {
    H1,
    Text,
    // LetterProfileImage, TODO: remove these from all views
    WalletActionsWrapper,
    ProfileUserWrapper,
    ProfileHeaderWrapper,
    ProfileHeader, 
    ProfileImage,
    ProfileUserName,
    ProfileWalletWrapper,
    ProfileWalletAddress,
    ProfileDetailsWrapper,
    CopyIcon,
    LogoutIcon,
    PrivateKeyIcon,
    ProfileLabel,
    ProfileImageWrapper,
    ProfileImageSkelton,
    Spinner
} from './styles';

import { colors } from '../constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {User} from '../Models/User'; 

type Props = {
    loading: boolean;
    user: User;
    walletAddress: string;
    exportPrivateKey: () => void;
    handleCopy: () => void;
    createdAt: string;
    artistsSupported: number;
    totalCollectibles: number;
    onImageChange: (event: React.FormEvent<HTMLInputElement>) => void;
    setIsUpdateUserNameModalOpen: (value: boolean) => void;
}

function UserProfileHeader({loading, user, walletAddress, exportPrivateKey, handleCopy, createdAt, artistsSupported, totalCollectibles, onImageChange, setIsUpdateUserNameModalOpen} : Props) {
    const { logout } = useWeb3Auth();
    const sliceWalletAddress = () => {
        return `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(walletAddress.length-6, walletAddress.length)}`
    }
    return (
        user && walletAddress ? <>
        <ProfileHeader>
            <>
            <input style={{ display: 'none' }} type="file" id="file-input" name="image-file" onChange={onImageChange} />
            <ProfileImageWrapper>
                {loading ? 
                <ProfileImageSkelton image={user?.profileImage}>
                    <Spinner/>
                </ProfileImageSkelton>
                : <ProfileLabel htmlFor="file-input">
                    <ProfileImage referrerPolicy="no-referrer" src={user?.profileImage}/>
                </ProfileLabel> }
            </ProfileImageWrapper>
            </>
            <ProfileHeaderWrapper>
                <ProfileUserWrapper>
                    <ProfileUserName onClick={() => setIsUpdateUserNameModalOpen(true)}>
                        {user.userName || user?.name || user.email || sliceWalletAddress()}
                    </ProfileUserName>

                    <ProfileWalletWrapper  >
                        <CopyToClipboard text={walletAddress as string} >
                            <ProfileWalletAddress onClick={handleCopy}>
                                {sliceWalletAddress()}
                                <CopyIcon/>
                            </ProfileWalletAddress>                
                        </CopyToClipboard>
                        <WalletActionsWrapper >
                            <Text margin="0 0 1em 1em" onClick={exportPrivateKey} fontSize=".8em" color={colors.lightGrey} cursor="pointer"><PrivateKeyIcon/> Export Private Key</Text>    
                            <Text  color={colors.lightGrey} cursor="pointer" margin="0 0 0 1em" fontSize=".8em" onClick={logout}><LogoutIcon/> Log Out</Text>
                        </WalletActionsWrapper>
                        
                    </ProfileWalletWrapper> 
                </ProfileUserWrapper>

                <ProfileDetailsWrapper >

                    {createdAt ? <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Joined
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="400">
                            {new Date(createdAt).toLocaleDateString()}
                        </H1>                       
                    </Flex> : null}

                    <Flex margin="0 0 0 2em" flexDirection="column" flexGrow=".5"  justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Total Collectibles
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {totalCollectibles ? totalCollectibles : totalCollectibles === 0 ? 0 : '-'}
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em"  flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Artists Supported
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {artistsSupported ? artistsSupported : artistsSupported === 0 ? 0 :  '-'}
                        </H1>                        
                    </Flex>
     
                </ProfileDetailsWrapper>

            </ProfileHeaderWrapper>
        </ProfileHeader>
        
        <ToastContainer 
        position="bottom-right"
        theme="dark"
        hideProgressBar={true}
        />
        </>
        : null 
    )
}

export default UserProfileHeader;