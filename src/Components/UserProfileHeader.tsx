
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useWeb3Auth } from "../Services/web3auth";

import {Flex} from '../styles';
import {
    H1,
    Text,
    LetterProfileImage,
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
    PrivateKeyIcon
} from './styles';

import { colors } from '../constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {User} from '../Models/User'; 

type Props = {
    user: User;
    walletAddress: string;
    exportPrivateKey: () => void;
    handleCopy: () => void;
    createdAt: string;
    artistsSupported: number;
    totalCollectibles: number;
    onImageChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

function UserProfileHeader({user, walletAddress, exportPrivateKey, handleCopy, createdAt, artistsSupported, totalCollectibles, onImageChange} : Props) {
    const { provider, logout } = useWeb3Auth();
    return (
        user && walletAddress ? <>
        <ProfileHeader>
            {user?.profileImage ? 
            <>
            <input style={{ display: 'none' }} type="file" id="file-input" name="image-file" onChange={onImageChange} />
            <label htmlFor="file-input">
            <ProfileImage referrerPolicy="no-referrer" src={user?.profileImage}/>
            </label>
            </> : <LetterProfileImage text={'0x'} type="file" id="file-input" name="image-file"/>}
            <ProfileHeaderWrapper>
                <ProfileUserWrapper>
                    <ProfileUserName>
                        {user?.email}
                    </ProfileUserName>

                    <ProfileWalletWrapper  >
                        <CopyToClipboard text={walletAddress as string} >
                            <ProfileWalletAddress onClick={handleCopy}>
                                {`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(walletAddress.length-6, walletAddress.length)}`}
                                <CopyIcon/>
                            </ProfileWalletAddress>                
                        </CopyToClipboard>
                        <Flex alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
                            <Text margin="0 0 1em 1em" onClick={exportPrivateKey} fontSize=".8em" color={colors.lightGrey} cursor="pointer"><PrivateKeyIcon/> Export Private Key</Text>    
                            <Text  color={colors.lightGrey} cursor="pointer" margin="0 0 0 1em" fontSize=".8em" onClick={logout}><LogoutIcon/> Log Out</Text>
                        </Flex>
                        
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
                            {totalCollectibles ? totalCollectibles : '-'}
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em"  flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Artists Supported
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {artistsSupported ? artistsSupported : '-'}
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