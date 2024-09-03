import Admin from "./Admin.jsx";
import LandingPage from "./LandingPage.jsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
};

export default App;
