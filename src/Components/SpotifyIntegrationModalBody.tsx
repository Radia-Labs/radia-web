import {H1, Paragraph, Button, SpotifyModalImage} from "./styles";
import {Flex} from "../styles";
import {colors} from "../constants";

type Props = {
    openSpotifyAuth: () => void;
}

const SpotifyIntegrationModalBody = ({ openSpotifyAuth }: Props) => (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <SpotifyModalImage/>
       <H1>Connect Your Spotify Account</H1>
       <Paragraph fontSize=".8em" padding="0 6em" textAlign="center">Integrate Spotify with your Radia account to start earning.</Paragraph>
       <Button background={`${colors.brightGreen}`} onClick={openSpotifyAuth}>Integarate with Spotify</Button>
    </Flex>
)


export default SpotifyIntegrationModalBody;