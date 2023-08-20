import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import Trending from "../components/Trending";
import Upcoming from "../components/Upcoming";

const Home = () => {
  return (
    <div>
      <Trending />
      <NowPlaying />
      <Popular />
      <TopRated />
      <Upcoming />
    </div>
  );
};

export default Home;
