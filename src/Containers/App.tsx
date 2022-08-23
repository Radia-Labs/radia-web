import { useEffect, useState } from "react";
import { useWeb3Auth } from "../Services/web3auth";
import { useNavigate } from 'react-router-dom'
import {StyledModal, Flex} from '../styles';
import SpotifyModalBody from '../Components/SpotifyModalBody';
import InProgress from '../Components/InProgress';
import TrendingArtists from '../Components/TrendingArtists';
import { 
  getSpotifyUser, 
  getUser, 
  createUser, 
  getSpotifyAuth, 
  createSpotifyIntegration
} from "../utils";

function App() {
  const { provider, login, logout, getAccounts, web3Auth } = useWeb3Auth();
  const [isSpotifyModalOpen, setSpotifyModalIsOpen] = useState(false)  
  
  useEffect(() => {
    const init = async () => {
        if (web3Auth && !provider) 
          login()
    }
    init()
  }, [web3Auth, provider])
  

  useEffect(() => {
    const init = async () => {
      
        // Get user information from web3auth and Radia database
        const authUser = await web3Auth?.getUserInfo()
        const radiaUser = await getUser(authUser?.verifierId as string)

        // If Radia user doesn't exist, create new user
        if (authUser && !radiaUser.Items.length) {
          const walletAddress = await provider?.getAccounts()
          const addresses = {"polygon": walletAddress[0]}
          await createUser(authUser as object, addresses as object)
        }

        // If authUser, then run query to get user's spotify integration
        if(authUser) {
          const spotifyUser = await getSpotifyUser(authUser.verifierId as string)
          if (!spotifyUser.Items.length) {
            // If user not found, then create user in radia
            // Trigger spotify login flow, get accessTokens and add to radia database 
            setSpotifyModalIsOpen(true)
          }
        }        
    }

    if (web3Auth && provider)
      init()

  }, [web3Auth, provider])    

  useEffect(() => {
    // If Spotify authorization is successful, and code in query params, then create integration in radia database
    const init = async () => {
      const params = new URLSearchParams(window.location.search)
      let code = params.get('code') 
      const authUser = await web3Auth?.getUserInfo()
      if (code && authUser) {
        const spotifyAuth = await getSpotifyAuth(code as string)
        if (spotifyAuth) {
          await createSpotifyIntegration(authUser?.verifierId as string, spotifyAuth)
          setSpotifyModalIsOpen(false)
          params.delete('code')
          window.history.pushState({}, document.title, "/");
        } else {
          alert("Could not veryify Spotify authorization. Please try again.")
          setSpotifyModalIsOpen(false)
        }
      }
    }
    init()
  }, [web3Auth, provider])     


  const authSpotify = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectURL = "http://localhost:3000";
    const spotifyClientId = "78ec81265fb24a0baceeb9a702bcee1d";
    const scopes = [
      "user-read-recently-played",
      "user-top-read"
    ]
    const loginURL = `${authEndpoint}?client_id=${spotifyClientId}&redirect_uri=${redirectURL}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true&usePKCE=false`;
    window.open(loginURL, "_self");
  }  
  
  
  const myCollectionView = (
    <>
      <InProgress/>
      <TrendingArtists/>
    </>
  );
  
  // TODO: we might want to show some kind of partial view here with skeletons or something. 
  const unloggedInView = (
    <div></div>
  );

  return (
    <>
    {provider ? myCollectionView : unloggedInView}

    <StyledModal
        isOpen={isSpotifyModalOpen}
        onBackgroundClick={null}
        onEscapeKeydown={null}>
        <SpotifyModalBody openSpotifyAuth={authSpotify}/>
    </StyledModal>    
    </>
  );
}

export default App;