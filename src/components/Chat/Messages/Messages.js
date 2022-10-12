import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import styles from "./Messages.module.css";

const Messages = () => {
  const { sendRequest, error } = useHttp();
  const [convo, setConvo] = useState();
  const [params, setParams] = useSearchParams();
  const token = useSelector((state) => state.auth.token);

  const recipientId = useMemo(() => {
    return params.get("id");
  }, [params]);

  useEffect(() => {
    if (recipientId) {
      sendRequest(
        {
          url: `http://localhost:8080/messages/convo/${recipientId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
        (data) => {
          setConvo(data.convo);
        }
      );
    }
  }, [recipientId]);

  return (
    <div className={styles.conversation}>
      {convo &&
        convo.messages.map((message) => (
          <div className={styles.messageContainer} key={message._id}>
            <div
              className={`${styles.message} ${
                message.sender === recipientId
                  ? styles.recipient
                  : styles.sender
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Messages;
