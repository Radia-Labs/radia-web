import InProgress from '../Components/InProgress';
import TrendingArtists from '../Components/TrendingArtists';
import RecentlyEarned from '../Components/RecentlyEarned';

function Index() {
  // DEPRECATED NOT BEUNG USED - using userprofile instead
  return (
    <>
      <InProgress/>
      <TrendingArtists/>
      <RecentlyEarned/>
    </>
  );
}

export default Index;