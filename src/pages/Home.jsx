import DesktopHeader from "../components/DesktopHeader";
import DesktopMenu from "../components/DesktopMenu";
import { Outlet } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";

const Home = () => {
  return (
    <div>
      <div className="sticky-top">
        <div className="d-none d-md-block">
          <DesktopHeader />
        </div>
        <div className="d-md-none">
          <MobileHeader />
        </div>
      </div>
      <div>
        <div className="menu-desktop d-none d-md-block bg-white shadow-sm">
          <div>
            <DesktopMenu />
          </div>
        </div>
        <div className="content-desktop ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
