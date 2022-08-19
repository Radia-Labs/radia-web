import { Fragment } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TopHeader from "./Components/TopHeader";
import Layout from "./Components/Layout";
import App from "./Containers/App";
import ArtistProfile from "./Containers/ArtistProfile";


const Main = () => (

    <BrowserRouter>
        <TopHeader/>
        <Layout>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/artist/:id" element={<ArtistProfile />} />
            </Routes>
        </Layout>   
    </BrowserRouter>
  
);

export default Main;