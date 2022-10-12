import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../../store/user-slice";
import Conversation from "../Conversation/Conversation";
import useHttp from "../../../../hooks/use-http";
import styles from "./Conversations.module.css";

const ConversationList = () => {
  const { sendRequest, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const convos = useSelector((state) => state.user.userConvos);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:8080/messages/user-convos",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
      (data) => {
        dispatch(userActions.setUserConvos(data.users));
      }
    );
  }, []);

  const handleLoadConvo = (recipientId) => {
    navigate(`/user/chat?id=${recipientId}`);
  };

  return (
    <div className={styles.conversationList}>
      {convos.map((user) => (
        <Conversation
          key={user._id}
          user={user}
          onLoadConvo={handleLoadConvo}
        />
      ))}
    </div>
  );
};

export default ConversationList;
