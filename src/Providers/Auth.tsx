import React, { useEffect, useState } from "react";
import { ModalProvider } from 'styled-react-modal'
import { useWeb3Auth } from "../Services/web3auth";
import {StyledModal} from '../styles';
import SpotifyIntegrationModalBody from '../Components/SpotifyIntegrationModalBody';
import SpotifyLoadingModalBody from '../Components/SpotifyLoadingModalBody';
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { 
  getSpotifyUser, 
  getUser, 
  createUser, 
  updateUser,
  getSpotifyAuth, 
  createSpotifyIntegration,
  getSpotifyProfile,
  getRandomNumber,
} from "../utils";
import {User} from '../Models/User'
import { APP_URL, MEDIA_CDN_HOST } from "../constants";

interface IAuthContext {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const defaultState = {
  currentUser: null,
  setCurrentUser: () => {},
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const { provider, login, isLoading, web3Auth } = useWeb3Auth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSpotifyModalOpen, setSpotifyModalIsOpen] = useState(false)
  const [isSpotifyLoadingModalOpen, setSpotifyLoadingModalIsOpen] = useState(false)  
  let randomNum = getRandomNumber(4, 1);

  useEffect(() => {
    const init = async () => {
        // Social login 
        let authUser = await web3Auth?.getUserInfo()
        let appPubKey;
        if (Object.keys(authUser as object).length) {
          const appScopedPrivateKey = await provider?.getPrivateKey()
          appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");                 
        } else {
          // External wallet login
          authUser = await web3Auth?.authenticateUser()
          const accounts = await provider?.getAccounts()
          appPubKey = accounts[0];
        }

        // If user isn't authenticated using Social Login and doesn't have a verifierId, then use appPubKey as verifierId.
        let user = authUser;
        if (!user?.verifierId) {
          user = {
            verifierId: appPubKey,
            idToken: authUser?.idToken
          }
        }

        // Get Radia user
        const radiaUser = await getUser(authUser?.idToken as string, appPubKey, user.verifierId as string)        
        
        if (radiaUser.Items.length) {
          // Update user with current idToken
          if (radiaUser.Items[0].idToken !== user.idToken) {
            console.log("updating user with...", user)
            await updateUser(user.idToken as string, appPubKey, user.verifierId as string, user)
          }
          // Set the current user
          setCurrentUser(radiaUser.Items[0] as User)          
        }
        
        // If Radia user doesn't exist, create new user with random profile image
        if (user && !radiaUser.Items.length) {
          const walletAddress = await provider?.getAccounts()
          const addresses = {"polygon": walletAddress[0]}
          const _user = {...user, profileImage: `${MEDIA_CDN_HOST}/radia-profile-${randomNum}.png`}
          const radiaUser = await createUser(user?.idToken as string, appPubKey, _user as object, addresses as object)
          console.log("created user", radiaUser)
          if (radiaUser) {
            setCurrentUser(radiaUser as User)          
            // Run query to get user's spotify integration, show integration modal if not exists
            const spotifyUser = await getSpotifyUser(user?.idToken as string, appPubKey, user.verifierId as string)
            console.log(spotifyUser, "spotifyUser")
            if (spotifyUser.Count === 0) {
              // If user not found, then create user in radia
              // Trigger spotify login flow, get accessTokens and add to radia database 
              setSpotifyModalIsOpen(true)
            }
                         
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

        // Get user and authentication information from web3auth
        let authUser = await web3Auth?.getUserInfo()
        let appPubKey;
        if (Object.keys(authUser as object).length) {
          const appScopedPrivateKey = await provider?.getPrivateKey()
          appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");                 
        } else {
          authUser = await web3Auth?.authenticateUser()
          const accounts = await provider?.getAccounts()
          appPubKey = accounts[0];
        }

        // If user isn't authenticated using Social Login and doesn't have a verifierId, then use appPubKey as verifierId.
        let user = authUser;
        if (!user?.verifierId) {
          user = {
            verifierId: appPubKey,
            idToken: authUser?.idToken,
          }
        }         
      
      // We've redirected from Spotify with authorization code in query params, create spotify integration.
      if (code && user) {
        setSpotifyModalIsOpen(false)
        let spotifyAuth = await getSpotifyAuth(user?.idToken as string, appPubKey, code as string)
        if (spotifyAuth) {
          setSpotifyLoadingModalIsOpen(true)         
          await createSpotifyIntegration(user?.idToken as string, appPubKey, user?.verifierId as string, spotifyAuth)
          // Update the Auth| model with spotify email, if none exists on that user.
          if (!authUser?.verifierId) {
            const spotifyProfile = await getSpotifyProfile(user?.idToken as string, appPubKey, spotifyAuth.refresh_token as string)          
            const walletAddress = await provider?.getAccounts()
            const addresses = {"polygon": walletAddress[0]}        
            const updatedUser = {
              name: spotifyProfile.display_name,
              email: spotifyProfile.email,
              addresses: addresses,
            }
            await updateUser(user?.idToken as string, appPubKey, user.verifierId as string, updatedUser as object)
          }
          params.delete('code')
          window.history.pushState({}, document.title, "/");

        } else {
          alert("Could not veryify Spotify authorization. Please try again.")
          setSpotifyModalIsOpen(true)
        }
      }
    }
    if (web3Auth && provider)
      init()
  }, [web3Auth, provider])  

  useEffect(() => {
    const init = async () => {
      login()
    }
    if (web3Auth && !provider && !isLoading) 
      init()

  }, [web3Auth, provider, isLoading])  

  const authSpotify = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectURL = APP_URL;
    const spotifyClientId = "78ec81265fb24a0baceeb9a702bcee1d";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-read-recently-played",
      "user-top-read"
    ]
    const loginURL = `${authEndpoint}?client_id=${spotifyClientId}&redirect_uri=${redirectURL}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true&usePKCE=false`;
    window.open(loginURL, "_self");
  }  
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
      <ModalProvider>
        <StyledModal
            isOpen={isSpotifyModalOpen}
            onBackgroundClick={null}
            onEscapeKeydown={null}>
            <SpotifyIntegrationModalBody openSpotifyAuth={authSpotify}/>
        </StyledModal>

        <StyledModal
            isOpen={isSpotifyLoadingModalOpen}
            onBackgroundClick={null}
            onEscapeKeydown={null}>
            <SpotifyLoadingModalBody setSpotifyLoadingModalIsOpen={setSpotifyLoadingModalIsOpen}/>
        </StyledModal>        
      </ModalProvider>
    </AuthContext.Provider>
  );
}

export const useCurrentUser = () => React.useContext(AuthContext)
