import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Web3AuthProvider } from "./Services/web3auth";
import { CHAIN_CONFIG_TYPE } from "./Services/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "./constants";
import {AuthProvider} from "./Providers/Auth";
import TopHeader from "./Components/TopHeader";
import Layout from "./Components/Layout";
import Index from "./Containers/Index";
import ArtistProfile from "./Containers/ArtistProfile";
import UserProfile from "./Containers/UserProfile";
import CollectibleDetails from "./Containers/CollectibleDetails";
import AllCollectibles from "./Containers/AllCollectibles";
import NewMusicReleases from "./Containers/NewMusicReleases";


const Main = () => {
    const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
    const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("polygon");    

    return (
        <BrowserRouter>
            <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
                <AuthProvider>
                    <TopHeader/>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Index/>} />
                            <Route path="/account" element={<UserProfile/>} />
                            <Route path="/account/collectibles" element={<AllCollectibles/>} />
                            <Route path="/artist/:id" element={<ArtistProfile/>} />
                            <Route path="/collectible/:sk" element={<CollectibleDetails/>} />
                            <Route path="/new-music" element={<NewMusicReleases/>} />
                        </Routes>
                    </Layout>    
                </AuthProvider>
            </Web3AuthProvider>
        </BrowserRouter>
    )
  
};

export default Main;