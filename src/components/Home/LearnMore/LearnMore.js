import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProduct from "../../UI/IconComponents/AddProduct";
import ContactSeller from "../../UI/IconComponents/ContactSeller";
import SearchProduct from "../../UI/IconComponents/SearchProduct";
import SignUp from "../../UI/IconComponents/SignUp";
import styles from "./LearnMore.module.css";
import LearnMoreCard from "./LearnMoreCard/LearnMoreCard";

const LearnMore = () => {
  const [showNext, setShowNext] = useState([]);
  const showLearnMore = useSelector((state) => state.ui.showLearnMore);

  useEffect(() => {
    if (showLearnMore) {
      if (showNext.length < 4) {
        setTimeout(() => {
          setShowNext((prevState) => {
            return [...prevState, "next"];
          });
        }, 250);
      }
    }
  }, [showLearnMore, showNext]);

  return (
    <div className={styles.learnMore}>
      <LearnMoreCard in={showLearnMore}>
        <div className={styles.icon}>
          <SignUp />
        </div>
        <div className={styles.content}>
          <h2>Sign Up</h2>
          <p>Create your account to start your journey.</p>
        </div>
      </LearnMoreCard>
      <LearnMoreCard in={showNext.length >= 1}>
        <div className={styles.icon}>
          <AddProduct />
        </div>
        <div className={styles.content}>
          <h2>Post</h2>
          <p>Post your stuff to make it available for everyone.</p>
        </div>
      </LearnMoreCard>
      <LearnMoreCard in={showNext.length >= 2}>
        <div className={styles.icon}>
          <SearchProduct />
        </div>
        <div className={styles.content}>
          <h2>Navigate</h2>
          <p>Navigate through our shop to find what you are looking for.</p>
        </div>
      </LearnMoreCard>
      <LearnMoreCard in={showNext.length >= 3}>
        <div className={styles.icon}>
          <ContactSeller />
        </div>
        <div className={styles.content}>
          <h2>Contact</h2>
          <p>Contact the seller directly, send an message or email.</p>
        </div>
      </LearnMoreCard>
    </div>
  );
};

export default LearnMore;
