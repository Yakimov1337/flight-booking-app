import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Home from "./pages/Home";
import AboutUs from "./pages/static/AboutUs";
import ContactUs from "./pages/static/ContactUs";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/static/NotFound";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/shared/ScrollToTop";
import Toast from "./components/shared/Toast";

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
