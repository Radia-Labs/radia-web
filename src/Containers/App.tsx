import { useEffect, useState, useMemo, useRef } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../web3RPC";
import { getSpotifyUser, getUser, createUser, getSpotifyAuth, createSpotifyIntegration, getCollectibles, getArtists } from "../utils";
import { useNavigate } from 'react-router-dom'
import {StyledModal, Flex} from '../styles';
import SpotifyModalBody from '../Components/SpotifyModalBody';
import Collectible from '../Components/Collectible';
import Pagination from '../Components/Pagination';
import Artist from '../Components/Artist';
import { H1 } from "../Components/styles";

const clientId = "YOUR_CLIENT_ID"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [loadingNext, setNextLoading] = useState(false);
  const [loadingBack, setBackLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  const [isSpotifyModalOpen, setSpotifyModalIsOpen] = useState(false)
  const [collectibles, setCollectibles] = useState<Array<object>>();
  const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState<Array<{pk: string, sk: string}>>([]);
  const [artists, setArtists] = useState<Array<object>>();
  const [lastEvaluatedKeysArtists, setLastEvaluatedKeysArtists] = useState<Array<{pk: string, sk: string}>>([]);  
  const [page, setPage] = useState(-1);
  const [artistsPage, setArtistsPage] = useState(-1);
  const navigate = useNavigate()  

  useEffect(() => {
    const init = async () => {
      try {
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x89",
          rpcTarget: "https://polygon-mainnet.infura.io/v3/766688f559594ccd9054dccab6325832", // TODO: Add new infura account RPCTarget
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google"],
          appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // TODO; Your App Logo Here
        }
      });

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId,
          network: "testnet",
          uxMode: "popup", 
          whiteLabel: {
            name: "Your app Name",
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en",
            dark: true, // whether to enable dark mode. defaultValue: false
          }, 
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);

      await web3auth.initModal({
        modalConfig: {
          [WALLET_ADAPTERS.OPENLOGIN]: {
            label: "openlogin",
            loginMethods: {
              reddit: {
                showOnModal: false,
                name: "reddit",
              },
              facebook: {
                showOnModal: false,
                name: "facebook",
              },
              discord: {
                showOnModal: false,
                name: "discord",
              },
              twitch: {
                showOnModal: false,
                name: "twitch",
              },    
              apple: {
                showOnModal: false,
                name: "apple",
              },    
              line: {
                showOnModal: false,
                name: "line",
              }, 
              github: {
                showOnModal: false,
                name: "github",
              },  
              kakao: {
                showOnModal: false,
                name: "kakao",
              },  
              linkedin: {
                showOnModal: false,
                name: "linkedin",
              },    
              twitter: {
                showOnModal: false,
                name: "twitter",
              },   
              weibo: {
                showOnModal: false,
                name: "weibo",
              },     
              wechat: {
                showOnModal: false,
                name: "wechat",
              }                                                                                                                                                 
            },
          },
        },
      });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if(web3auth && !provider)
      login()
  }, [web3auth, provider])

  useEffect(() => {
    const init = async () => {
        // Get user information from web3auth and Radia database
        const authUser = await getUserInfo()
        const radiaUser = await getUser(authUser?.verifierId as string)
        setUser(radiaUser.Items[0])

        // If Radia user doesn't exist, create new user
        if (authUser && !radiaUser.Items.length) {
          const addresses = {"polygon": await getAccounts()}
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

    if (web3auth)
      init()
  }, [provider, web3auth])

  useEffect(() => {
    // If Spotify authorization is successful, and code in query params, then create integration in radia database
    const init = async () => {
      const params = new URLSearchParams(window.location.search)
      let code = params.get('code') 
      const authUser = await getUserInfo()
      if (code && authUser) {
        const spotifyAuth = await getSpotifyAuth(code as string)
        if (spotifyAuth) {
          const spotifyIntegration = await createSpotifyIntegration(authUser?.verifierId as string, spotifyAuth)
          console.log(spotifyIntegration, 11)
          setSpotifyModalIsOpen(false)
          params.delete('code')
          navigate({
            search: params.toString(),
          })
        } else {
          alert("Could not veryify Spotify authorization. Please try again.")
          setSpotifyModalIsOpen(false)
        }
      }
    }
    init()
  }, [web3auth, provider])

  useEffect(() => {
    const init = async () => {
      const authUser = await getUserInfo()
      if (authUser) {
        let lastEvaluatedKey;
        const collectibles = await getCollectibles(authUser.verifierId as string, lastEvaluatedKey)
        setCollectibles(collectibles.Items)
        setLastEvaluatedKeys([collectibles.LastEvaluatedKey])
      }
    }
    init()
  }, [web3auth, provider])

  useEffect(() => {
    const init = async () => {
      const authUser = await getUserInfo()
      if (authUser) {
        let lastEvaluatedKey;
        const artists = await getArtists(authUser.verifierId as string, lastEvaluatedKey)
        setArtists(artists.Items)
        setLastEvaluatedKeysArtists([artists.LastEvaluatedKey])
      }
    }
    init()
  }, [web3auth, provider])  


  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    return user
  };

  const authSpotify = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectURL = "http://localhost:3000";
    const clientId = "78ec81265fb24a0baceeb9a702bcee1d";
    const scopes = [
      "user-read-recently-played",
    ]
    const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true&usePKCE=false`;
    window.open(loginURL, "_self");
  }

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    return address
  };

  // const logout = async () => {
  //   if (!web3auth) {
  //     console.log("web3auth not initialized yet");
  //     return;
  //   }
  //   await web3auth.logout();
  //   setProvider(null);
  // };  

  // const getChainId = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const chainId = await rpc.getChainId();
  //   console.log(chainId);
  // };

  // const getBalance = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const balance = await rpc.getBalance();
  //   console.log(balance);
  // };

  // const sendTransaction = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const receipt = await rpc.sendTransaction();
  //   console.log(receipt);
  // };

  // const signMessage = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const signedMessage = await rpc.signMessage();
  //   console.log(signedMessage);
  // };

  // const getPrivateKey = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const privateKey = await rpc.getPrivateKey();
  //   // TODO: remove this console.log
  //   // console.log(privateKey);
  // };

  const getPreviousCollectibles = async () => {
    setBackLoading(true)
    setPage(page-1)
    const prevCollectibles = await getCollectibles(user?.verifierId as string, lastEvaluatedKeys[page-1])
    setCollectibles(prevCollectibles.Items)    
    setBackLoading(false)
  }

  const getNextCollectibles = async () => {
    setNextLoading(true)
    setPage(page+1)
    const nextCollectibles = await getCollectibles(user?.verifierId as string, lastEvaluatedKeys[page+1])
    setCollectibles(nextCollectibles.Items)
    setLastEvaluatedKeys([...lastEvaluatedKeys, nextCollectibles.LastEvaluatedKey])
    setNextLoading(false)
  }    

  function getCollectibleType(collectible:any) {
    const currentAchievement = getCurrentAcheivement(collectible)
    return `${collectible.name} - ${currentAchievement}`    
  }

  function getCurrentAcheivement(collectible:any) {
        
    if (collectible.streamedMilliseconds < 3600000 ) {
      return '1 Hour Streamed'
    }

    if (collectible.streamedMilliseconds > 3600000 && collectible.streamedMilliseconds < 3600000 * 5) {
      return '5 Hours Streamed'
    }  
    
    if (collectible.streamedMilliseconds > 3600000 * 5 && collectible.streamedMilliseconds < 3600000 * 10) {
      return '10 Hours Streamed'
    }       

    if (collectible.streamedMilliseconds > 3600000 * 10 && collectible.streamedMilliseconds < 3600000 * 15) {
      return '15 Hours Streamed'
    }        
  
    if (collectible.streamedMilliseconds > 3600000 * 15 && collectible.streamedMilliseconds < 3600000 * 25) {
      return '25 Hours Streamed'
    }     

  }

  const getPreviousArtists = async () => {
    setBackLoading(true)
    setArtistsPage(artistsPage-1)
    const prevArtists = await getArtists(user?.verifierId as string, lastEvaluatedKeysArtists[artistsPage-1])
    setArtists(prevArtists.Items)    
    setBackLoading(false)
  }

  const getNextArtists = async () => {
    setNextLoading(true)
    setArtistsPage(artistsPage+1)
    const nextArtists = await getArtists(user?.verifierId as string, lastEvaluatedKeysArtists[artistsPage+1])
    setArtists(nextArtists.Items)
    setLastEvaluatedKeysArtists([...lastEvaluatedKeysArtists, nextArtists.LastEvaluatedKey])
    setNextLoading(false)
  }    

  function goToArtistProfile(artist:any) {
    navigate(`/artist/${artist.id}`)
  }
  
  const myCollectionView = (
    <>
      {/* <button onClick={logout} >
        Log Out
      </button> */}

      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
        <Flex>
          <H1 fontSize="1.5rem">In Progress</H1>
          <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousCollectibles} onNext={getNextCollectibles} page={page} lastEvaluatedKey={lastEvaluatedKeys[page+1]}/>
        </Flex>
        <Flex justifyContent="flex-start" alignItems="left">

          {collectibles?.length == 0 && <H1 fontSize="1em">Calculating Data... Check back in a minute or so!</H1>}

          {collectibles?.map((collectible:object) => {
            const collectibleType = getCollectibleType(collectible);
            return <Collectible
              collectibleImage="https://via.placeholder.com/150"
              collectibleName={collectibleType as string}
              collectorImage={user.profileImage}
              collectorName={user.name}
            />
          })}
        </Flex>
      </Flex>

      <Flex>
        <H1 fontSize="1.5rem">Trending Artists</H1>
        <Pagination loadingNext={loadingNext} loadingBack={loadingBack} onBack={getPreviousArtists} onNext={getNextArtists} page={artistsPage} lastEvaluatedKey={lastEvaluatedKeysArtists[artistsPage+1]}/>
      </Flex>

      {collectibles?.length == 0 && <Flex justifyContent="flex-start" alignItems="left">
        <H1 fontSize="1em">Calculating Data... Check back in a minute or so!</H1>
      </Flex>}

      <Flex justifyContent="flex-start" alignItems="center">
        {artists?.map((artist:any) => {
          return <Artist artistImage={artist.images[0]?.url} artistName={artist.name} onClick={() => goToArtistProfile(artist)}/>
        })}
      </Flex>

      <StyledModal
        isOpen={isSpotifyModalOpen}
        onBackgroundClick={null}
        onEscapeKeydown={null}>
        <SpotifyModalBody openSpotifyAuth={authSpotify}/>
      </StyledModal>     
    </>
  );
  
  // TODO: we might want to show some kind of partial view here with skeletons or something. 
  const unloggedInView = (
    <div></div>
  );

  return (
    <>{provider ? myCollectionView : unloggedInView}</>
  );
}

export default App;