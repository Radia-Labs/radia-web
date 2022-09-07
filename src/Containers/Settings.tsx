import InProgress from '../Components/InProgress';
import TrendingArtists from '../Components/TrendingArtists';
import RecentlyEarned from '../Components/RecentlyEarned';
import { useWeb3Auth } from "../Services/web3auth";

function Settings() {
    const { provider, logout, web3Auth } = useWeb3Auth();

    const _logout = async () => {
        logout()
    }

  return (
    <>
        <button onClick={_logout}>logout</button>
    </>
  );
}

export default Settings;