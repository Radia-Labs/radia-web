import {useEffect, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useWeb3Auth } from "../Services/web3auth";
import { 
    getUser, 
  } from "../utils";
import {Flex} from '../styles';
import {
    H1,
    ProfileHeader, 
    ProfileImage,
    ProfileUserName,
    ProfileWalletAddress,
    CopyIcon
} from './styles';
import {User} from '../Models/User';
import { colors } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfileHeader() {
    const { provider, web3Auth } = useWeb3Auth();
    const [user, setUser] = useState<User| undefined>();
    const [walletAddress, setWalletAddress] = useState<String| undefined>();
    const [createdAt, setCreatedAt] = useState<string| undefined>();

    useEffect(() => {
        const init = async () => {
            const authUser = await web3Auth?.getUserInfo();
            const radiaUser = await getUser(authUser?.verifierId as string);
            setCreatedAt(radiaUser.Items[0].created)
            setUser(authUser as User)
            setWalletAddress(radiaUser.Items[0].addresses.polygon)
        }
        init()
    }, [web3Auth, provider])

    const handleCopy = () => {
        toast("Address copied to clipboard");
    }

    return (
        web3Auth && provider ? <ProfileHeader>
            <ProfileImage image={user?.profileImage}/>
            <Flex margin="0 0 0 2em" flexDirection="row" flexGrow="1" justifyContent="space-between" alignItems="center">
                <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
                    <ProfileUserName>
                        {user?.verifierId}
                    </ProfileUserName>

                    <CopyToClipboard text={walletAddress as string} >
                        <ProfileWalletAddress onClick={handleCopy}>
                            {`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(walletAddress.length-6, walletAddress.length)}`}
                            <CopyIcon/>
                        </ProfileWalletAddress>                
                    </CopyToClipboard>
                </Flex>

                <Flex margin="0 2em 0 2em" flexDirection="row" flexGrow=".5"  justifyContent="space-between" alignItems="center">

                    {createdAt ? <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1.2em" fontWeight="400" color={colors.secondaryLight}>
                            Joined
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="400">
                            {new Date(createdAt).toLocaleDateString()}
                        </H1>                       
                    </Flex> : null}

                    <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1.2em" fontWeight="400" color={colors.secondaryLight}>
                            Total Collectibles
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            TODO
                        </H1>                        
                    </Flex>

                    <Flex margin="0 0 0 2em" flexDirection="column" justifyContent="center" alignItems="center">
                        <H1 fontSize="1.2em" fontWeight="400" color={colors.secondaryLight}>
                            Artists Supported
                        </H1>
                        <H1 fontSize="1.2em" fontWeight="700">
                            TODO
                        </H1>                        
                    </Flex>
     
                </Flex>

            </Flex>
            <ToastContainer 
            position="bottom-right"
            theme="dark"
            hideProgressBar={true}
            />
        </ProfileHeader> : null 
    )
}

export default UserProfileHeader;