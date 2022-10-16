import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { convoActions } from "../../../store/convo-slice";
import Loader from "../../UI/Loader/Loader";
import useHttp from "../../../hooks/use-http";
import styles from "./Messages.module.css";

const Messages = () => {
  const { sendRequest, isLoading } = useHttp();
  const { sendRequest: checkForConvoChanges } = useHttp();
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const convo = useSelector((state) => state.convo.convo);
  const token = useSelector((state) => state.auth.token);

  const id = useMemo(() => {
    return params.get("id");
  }, [params]);

  useEffect(() => {
    if (id) {
      dispatch(convoActions.clearConvo());
      sendRequest(
        {
          url: `http://localhost:8080/messages/convo/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
        (data) => {
          if (data.convo.messages) {
            dispatch(convoActions.setConvo(data.convo.messages));
          }
        }
      );
    } else {
      dispatch(convoActions.clearConvo());
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const checkForChanges = setInterval(() => {
        checkForConvoChanges(
          {
            url: `http://localhost:8080/messages/convo/${id}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          },
          (data) => {
            if (data.convo.messages.length !== convo.length) {
              dispatch(convoActions.setConvo(data.convo.messages));
            }
          }
        );
      }, 2000);

      return () => clearInterval(checkForChanges);
    }
  }, [id]);

  return (
    <div className={styles.conversation}>
      {isLoading && <Loader />}
      {!isLoading &&
        convo.map((message) => (
          <div className={styles.messageContainer} key={message._id}>
            <div
              className={`${styles.message} ${
                message.sender === id ? styles.recipient : styles.sender
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
