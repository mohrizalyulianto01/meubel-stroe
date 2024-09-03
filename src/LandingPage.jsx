import LandingRouters from "./routers/LandingRouters.jsx";
import Footer from "./components/LandingPage/Footer/Footer.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Navbar from "./components/LandingPage/Navbar/Navbar.jsx";

const LandingPage = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <div>
        <LandingRouters />
      </div>
      <Footer />
    </Provider>
  );
};

export default LandingPage;
