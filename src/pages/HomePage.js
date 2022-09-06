import { Fragment, useState } from "react";
import SideBar from "../components/SideBar/SideBar";

const HomePage = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const handleToggleSideBar = () => {
    setShowSideBar((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <SideBar
        showSideBar={showSideBar}
        onToggleSideBar={handleToggleSideBar}
      />
    </Fragment>
  );
};

export default HomePage;
