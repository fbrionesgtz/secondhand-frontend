import { Fragment } from "react";
import Chat from "../components/Chat/Chat";
import BackButton from "../components/UI/Button/BackButton/BackButton";
import Conversations from "../components/Chat/Conversations/Conversations";

const ChatPage = () => {
  return (
    <Fragment>
      <BackButton />
      <Conversations />
      <Chat />
    </Fragment>
  );
};

export default ChatPage;
