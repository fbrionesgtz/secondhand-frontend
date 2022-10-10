import Button from "../../UI/Button/Button";
import useInput from "../../../hooks/use-input";
import useHttp from "../../../hooks/use-http";
import { useSelector } from "react-redux";

const ChatForm = () => {
  const { sendRequest, error } = useHttp();
  const token = useSelector((state) => state.auth.token);

  const isEmpty = (value) => value.trim().length > 0;

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
        url: "http://localhost:8080/messages/send/631a4fb965cb9d94793272ce",
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
    <div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={messageChangeHandler}
          onBlur={messageBlurHandler}
        />
        <Button content="Send" class="primary" type="submit" />
      </form>
    </div>
  );
};

export default ChatForm;
