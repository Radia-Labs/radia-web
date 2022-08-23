import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Web3AuthProvider } from "./Services/web3auth";
import { CHAIN_CONFIG_TYPE } from "./Services/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "./constants";
import TopHeader from "./Components/TopHeader";
import Layout from "./Components/Layout";
import App from "./Containers/App";
import ArtistProfile from "./Containers/ArtistProfile";
import UserProfile from "./Containers/UserProfile";


const Main = () => {
    const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
    const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("polygon");    

    return (
        <BrowserRouter>
            <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
                <TopHeader/>
                <Layout>
                    <Routes>
                        <Route path="/" element={<App/>} />
                        <Route path="/account" element={<UserProfile/>} />
                        <Route path="/artist/:id" element={<ArtistProfile/>} />
                    </Routes>
                </Layout>     
            </Web3AuthProvider>
        </BrowserRouter>
    )
  
};

export default Main;