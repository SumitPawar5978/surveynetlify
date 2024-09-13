import { useEffect, useState } from "react";
import "./App.css";
import Splash from "./features/common/Splash";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./constants/routes";
import Navbar from "./features/common/Navbar";
import PwaInstallPopup from "./features/PwaInstallPopup";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isNavVisible = {
    login: 1,
    registration: 1,
    fogotPassword: 1,
    setPassword: 1,
    otp: 1,
    medicalStudReg: 1,
    schoolStudReg: 1,
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <Splash />;
  }

  if (!isMobile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>This app is only available on mobile devices.</h1>
      </div>
    );
  }
  const showNavbar = location.pathname !== "/";
  return (
    <>
      {!isNavVisible[
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      ] &&
        showNavbar && <Navbar />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
      <PwaInstallPopup/>
    </>
  );
}

export default App;
