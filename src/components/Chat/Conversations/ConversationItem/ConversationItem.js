import styles from "./ConversationItem.module.css";

const Conversation = (props) => {
  return (
    <div
      className={`${styles.conversation} ${props.active && styles.active}`}
      onClick={props.onLoadConvo.bind(null, props.user._id)}
    >
      <div className={styles.userImg}>
        <img src={`http://localhost:8080/${props.user.profileImage}`} />
      </div>
      <p>{`${props.user.firstName} ${props.user.lastName}`}</p>
    </div>
  );
};

export default Conversation;
