import {Header, Logo, H1, GradientButton} from "./styles";
import {Flex} from "../styles";

const TopHeader = () => (
    <Header>
        <Flex>
            <Flex justifyContent="flex-start" flexWrap="no-wrap" alignItems="baseline" width="10%">
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