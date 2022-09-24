import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button/Button";
import styles from "./Home.module.css";
import LearnMore from "./LearnMore/LearnMore";

const Home = () => {
  const dispatch = useDispatch();
  const showLearnMore = useSelector((state) => state.ui.showLearnMore);

  const navigate = useNavigate();
  return (
    <div className={styles.home}>
      <div className={styles.actions}>
        <Button
          content="Sign In"
          styles={{ marginRight: "1rem" }}
          class="ghost"
          onClick={() => {
            navigate("auth/login");
          }}
        />
        <Button
          content="Sign Up"
          styles={{ marginRight: "1rem" }}
          class="secondary"
          onClick={() => {
            navigate("auth/signup");
          }}
        />
      </div>

      <div className={styles.content}>
        <h1>Secondhand</h1>
        <p>
          Someone else might be looking for the stuff you no longer need, so
          sell your old stuff and find what you want.
        </p>
        {!showLearnMore && (
          <Button
            content="Learn More"
            class="primary"
            onClick={() => {
              dispatch(uiActions.showLearnMore());
            }}
          />
        )}
        <LearnMore />
      </div>
    </div>
  );
};

export default Home;
