import AiringToday from "../components/AiringToday";
import Hero from "../components/Hero";
import HomeHeader from "../components/HomeHeader";
import NowPlaying from "../components/NowPlaying";
import OnTheAir from "../components/OnTheAir";
import Popular from "../components/Popular";
import PopularSeries from "../components/PopularSeries";
import TopRated from "../components/TopRated";
import TopRatedSeries from "../components/TopRatedSeries";
import Trending from "../components/Trending";
import Upcoming from "../components/Upcoming";

const Home = () => {
  return (
    <div>
      {/* <HomeHeader /> */}
      <Hero />
      <Trending />
      <OnTheAir />
      <NowPlaying />
      <AiringToday />
      <Popular />
      <PopularSeries />
      <TopRated />
      <TopRatedSeries />
      <Upcoming />
    </div>
  );
};

export default Home;
