import {Header, Logo, H1, GradientButton} from "./styles";
import {Flex} from "../styles";

const TopHeader = () => (
    <Header>
        <Flex width="100%">
            <Flex justifyContent="flex-start" flexWrap="no-wrap" alignItems="baseline" >
                <Logo/>
                <H1>
                    Radia
                </H1>
            </Flex>
            <GradientButton>
                My Collection
            </GradientButton>
        </Flex>
    </Header>
)


export default TopHeader;