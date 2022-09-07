import {Header, LogoWrapper, Logo, H1, Text, Button} from "./styles";
import {Flex} from "../styles";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const TopHeader = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <Flex width="100%">
                <LogoWrapper onClick={() => navigate('/')}>
                    <Logo/>
                    <H1>Radia</H1>
                </LogoWrapper>
                <Flex responsive="hidden" justifyContent="flex-end">
                    <Text onClick={() => navigate('/new-music')} cursor="pointer" fontSize=".8em" margin="0 3em 0 0">New Music</Text>
                    <Text onClick={() => navigate('/collectibles')} cursor="pointer" fontSize=".8em" margin="0 3em 0 0">My Collectibles</Text>
                    <Button onClick={() => navigate('/')}>My Collection</Button>
                </Flex>
            </Flex>
            <HamburgerMenu />
        </Header>
        
    )
}


export default TopHeader;