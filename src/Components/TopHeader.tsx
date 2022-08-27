import {Header, LogoWrapper, Logo, H1, RadiaButton} from "./styles";
import {Flex} from "../styles";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/')
    }

    const goToAccount = () => {
        navigate('/account')
    }    

    return (
        <Header>
            <Flex width="100%">
                <LogoWrapper onClick={goToHome}>
                    <Logo/>
                    <H1>Radia</H1>
                </LogoWrapper>
   
                <RadiaButton onClick={goToAccount}>My Collection</RadiaButton>
            </Flex>
        </Header>
    )
}


export default TopHeader;