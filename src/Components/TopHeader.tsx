import {Header, LogoWrapper, Logo, H1, Text, Button} from "./styles";
import {Flex} from "../styles";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <Flex width="100%">
                <LogoWrapper onClick={() => navigate('/')}>
                    <Logo/>
                    <H1>Radia</H1>
                </LogoWrapper>
                <Flex  justifyContent="flex-end">
                    <Text onClick={() => navigate('/new-music')} cursor="pointer" fontSize=".8em" margin="0 3em 0 0">New Music</Text>
                    <Text onClick={() => navigate('/account/nfts')} cursor="pointer" fontSize=".8em" margin="0 3em 0 0">My Collectibles</Text>
                    <Button onClick={() => navigate('/account')}>My Collection</Button>
                </Flex>
            </Flex>
        </Header>
    )
}


export default TopHeader;