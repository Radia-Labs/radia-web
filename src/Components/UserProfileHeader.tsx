
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {Flex} from '../styles';
import {
    H1,
    Text,
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
    return (
        user && walletAddress ? <>
        <ProfileHeader>
            <ProfileImage image={user?.profileImage}/>
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
                            {totalCollectibles}
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em"  flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1em" fontWeight="400" color={colors.secondaryLight}>
                            Artists Supported
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            {artistsSupported}
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