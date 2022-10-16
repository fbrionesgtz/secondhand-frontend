import SearchBar from "../../UI/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { convoActions } from "../../../store/convo-slice";
import styles from "./ConversationHeader.module.css";

const ConversationHeader = () => {
  const dispatch = useDispatch();

  const handleSearchConvos = (search) => {
    dispatch(convoActions.setSearchConvoList(search));
  };

  return (
    <div className={styles.convosHeader}>
      <SearchBar
        styles={{ width: "75%" }}
        placeholder="Search"
        onSearch={handleSearchConvos}
      />
    </div>
  );
};

export default ConversationHeader;
