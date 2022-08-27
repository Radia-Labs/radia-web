import { useEffect, useState } from "react";
import {
    H1,
    Paragraph,   
    Text, 
    ProgressBarContainer,
    ProgressBarBackground,
    Progress, 
    SpotifyModalImage
} from "./styles";
import {Flex} from "../styles";

type Props = {
    setSpotifyLoadingModalIsOpen: (isOpen:boolean) => void;
}

const SpotifyLoadingModalBody = ({setSpotifyLoadingModalIsOpen}: Props) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(intervalId);
              setSpotifyLoadingModalIsOpen(false)
              window.location.reload();
              return 100;
            } else {
              return prev + 5;
            }
          });
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);
    return (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <SpotifyModalImage/>
       <H1>Loading Data...</H1>
       <Paragraph fontSize=".8em" padding="0 6em" textAlign="center">Let's see if you've earned any collectibles! Looking at your Spotify history...</Paragraph>
       
      
        <ProgressBarContainer  width="75%">
            <ProgressBarBackground />
            <Progress percent={progress} />
        </ProgressBarContainer>       
  
      
    </Flex>)
}


export default SpotifyLoadingModalBody;