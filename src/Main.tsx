import { Fragment } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TopHeader from "./Components/TopHeader";
import Layout from "./Components/Layout";
import App from "./Containers/App";


const Main = () => (

    <BrowserRouter>
        <TopHeader/>
        <Layout>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </Layout>   
    </BrowserRouter>
  
);

export default Main;