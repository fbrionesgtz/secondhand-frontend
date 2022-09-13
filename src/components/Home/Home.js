import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../UI/Button/Button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <h1>Secondhand</h1>
      <p>
        The old stuff you no longer need might be someone else's treasure, so
        sell your old stuff and find what you're looking for.
      </p>
      <Button
        content="Sign up"
        styles={{ marginRight: "1rem" }}
        class="primary"
        onClick={() => {
          navigate("auth/signup");
        }}
      />
      <Button
        content="Log in"
        class="secondary"
        onClick={() => {
          navigate("auth/login");
        }}
      />
    </div>
  );
};

export default Home;
