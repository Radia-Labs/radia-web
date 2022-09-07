
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
    CopyIcon
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
}

function UserProfileHeader({user, walletAddress, exportPrivateKey, handleCopy, createdAt, artistsSupported, totalCollectibles} : Props) {
    const { provider, logout } = useWeb3Auth();
    return (
        user && walletAddress ? <>
        <ProfileHeader>
            {user?.profileImage ? <ProfileImage referrerPolicy="no-referrer" src={user?.profileImage}/> : <LetterProfileImage name={'0x'} />}
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
                        <Text margin="0 0 0 1em" onClick={exportPrivateKey} fontSize=".8em" color={colors.lightGrey} cursor="pointer">Export Private Key</Text>
                        <br/>
                        <Text  color={colors.lightGrey} cursor="pointer" margin="0 0 0 1em" fontSize=".8em" onClick={logout}>Logout</Text>
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