import Button from "../../UI/Button/Button";
import useInput from "../../../hooks/use-input";
import useHttp from "../../../hooks/use-http";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { IoSend } from "react-icons/io5";
import styles from "./ChatForm.module.css";
import formStyles from "../../Auth/Form.module.css";

const ChatForm = () => {
  const { sendRequest, error } = useHttp();
  const [params, setParams] = useSearchParams();
  const token = useSelector((state) => state.auth.token);
  const isEmpty = (value) => value.trim().length > 0;

  const recipientId = useMemo(() => {
    return params.get("id");
  }, [params]);

  const {
    value: message,
    isValid: messageIsValid,
    valueInputChangeHandler: messageChangeHandler,
    valueInputBlurHandler: messageBlurHandler,
    reset: resetMessage,
  } = useInput(isEmpty, "Please enter a message");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageIsValid) {
      return;
    }

    sendRequest(
      {
        url: `http://localhost:8080/messages/send/${recipientId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: { message },
      },
      (data) => {
        console.log(data);
      }
    );

    resetMessage();
  };

  return (
    <div className={styles.chatForm}>
      <form onSubmit={handleSendMessage}>
        <div className={formStyles.control}>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
          />
        </div>
        <Button
          content={<IoSend />}
          styles={{ padding: "0.5rem" }}
          class="primary"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ChatForm;
