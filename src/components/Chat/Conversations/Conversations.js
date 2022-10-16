import ConversationHeader from "../ConversationHeader/ConversationHeader";
import ConversationList from "../ConversationList/ConversationList";
import styles from "./Conversations.module.css";

const Conversations = () => {
  return (
    <section className={styles.conversations}>
      <ConversationHeader />
      <ConversationList />
    </section>
  );
};

export default Conversations;
