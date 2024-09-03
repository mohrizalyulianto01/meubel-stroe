import HeroSection from "../../components/LandingPage/Hero/HeroSection.jsx";
import ServiceSection from "../../components/LandingPage/Service/ServiceSection.jsx";
import CustomSection from "../../components/LandingPage/Customize/CustomSection.jsx";
import RecentSection from "../../components/LandingPage/Recent/RecentSection.jsx";
import BestSellerSection from "../../components/LandingPage/Trending/BestSellerSection.jsx";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <BestSellerSection />
      <CustomSection />
      <RecentSection />
    </>
  );
};

export default HomePage;
