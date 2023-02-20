import logo from "../assets/img/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const MobileHeader = () => {
  const [display, setDisplay] = useState(true);

  const handleShowMenu = () => {
    setDisplay(!display);
  };
  return (
    <div className="d-flex flex-column">
      <div className="px-3 py-1 d-flex justify-content-between align-items-center bg-white shadow-sm">
        <div>
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </div>
        <div className="d-flex flex-row " onClick={() => handleShowMenu()}>
          {display && <FaBars className="iconBar" />}
          {!display && <FaTimes className="iconBar" />}
        </div>
      </div>
      {!display && (
        <div className="px-3 bg-white shadow-sm">
          <MobileMenu />
        </div>
      )}
    </div>
  );
};
export default MobileHeader;
