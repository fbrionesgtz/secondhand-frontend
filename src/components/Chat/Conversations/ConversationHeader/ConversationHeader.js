import SearchBar from "../../../UI/SearchBar/SearchBar";
import styles from "./ConversationHeader.module.css";

const ConversationHeader = () => {
  return (
    <div className={styles.convosHeader}>
      <SearchBar styles={{ width: "75%" }} placeholder="Search" />
    </div>
  );
};

export default ConversationHeader;
