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
  getSpotifyAuth, 
  createSpotifyIntegration
} from "../utils";
import {User} from '../Models/User'

interface IAuthContext {
  currentUser: User | null;
}

const defaultState = {
  currentUser: null,
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const { provider, login, logout, getAccounts, web3Auth } = useWeb3Auth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSpotifyModalOpen, setSpotifyModalIsOpen] = useState(false) 
  const [isSpotifyLoadingModalOpen, setSpotifyLoadingModalIsOpen] = useState(false)  
  
  useEffect(() => {
    const init = async () => {
      login()
    }
    if (web3Auth && !provider) 
      init()
  }, [web3Auth, provider])
  

  useEffect(() => {
    const init = async () => {

        // Get user information from web3auth and Radia database
        let authUser = await web3Auth?.getUserInfo()
        let appPubKey;
        let radiaUser;
        if (Object.keys(authUser as object).length) {
          const appScopedPrivateKey = await provider?.getPrivateKey()
          appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex");                 
          radiaUser = await getUser(authUser?.idToken as string, appPubKey, authUser?.verifierId as string)
        } else {
          authUser = await web3Auth?.authenticateUser()
          const accounts = await provider?.getAccounts()
          appPubKey = accounts[0];
          radiaUser = await getUser(authUser?.idToken as string, appPubKey, appPubKey as string)
        }

        // If user isn't authenticated using Social Login and doesn't have a verifierId, then use appPubKey as verifierId.
        let user = authUser;
        if (!user?.verifierId) {
          user = {
            verifierId: appPubKey,
            idToken: authUser?.idToken,
          }
        }   
        
        // Set the current user
        setCurrentUser(radiaUser.Items[0] as User)

        // If Radia user doesn't exist, create new user
        if (user && !radiaUser.Items.length) {
          const walletAddress = await provider?.getAccounts()
          const addresses = {"polygon": walletAddress[0]}
          radiaUser = await createUser(user?.idToken as string, appPubKey, user as object, addresses as object)
          setCurrentUser(radiaUser.Items[0] as User)          
        } 

        // If authUser, then run query to get user's spotify integration
        if(user) {
          const spotifyUser = await getSpotifyUser(user?.idToken as string, appPubKey, user.verifierId as string)
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
      
      if (code && user) {
        // TODO: update the Auth| model with spotify email and profile image, if none exists on that user.
        const spotifyAuth = await getSpotifyAuth(user?.idToken as string, appPubKey, code as string)
        if (spotifyAuth) {
          await createSpotifyIntegration(user?.idToken as string, appPubKey, user?.verifierId as string, spotifyAuth)
          setSpotifyModalIsOpen(false)
          params.delete('code')
          window.history.pushState({}, document.title, "/");
          setSpotifyLoadingModalIsOpen(true)
        } else {
          alert("Could not veryify Spotify authorization. Please try again.")
          setSpotifyModalIsOpen(true)
        }
      }
    }
    if (web3Auth && provider)
      init()
  }, [web3Auth, provider])     


  const authSpotify = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectURL = "http://localhost:3000";
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
    <AuthContext.Provider value={{ currentUser }}>
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
