import { Link } from "react-router-dom";
import GrayBackground from "../components/UI/Background/GrayBackground";

const PageNotFound = () => {
  return (
    <GrayBackground>
      <div style={{ textAlign: "center", marginTop: "10%" }}>
        <h1 style={{ color: "white" }}>Page not found :(</h1>
        <Link to="/" style={{ color: "#00cd8a" }}>
          Return to home page
        </Link>
      </div>
    </GrayBackground>
  );
};

export default PageNotFound;
