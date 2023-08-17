import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import Upcoming from "../components/Upcoming";

const Home = () => {
  return (
    <div>
        <NowPlaying />
        <Popular />
        <TopRated />
        <Upcoming />
    </div>
  )
};

export default Home;
