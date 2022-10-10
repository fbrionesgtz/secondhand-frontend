import { Fragment } from "react";
import Conversations from "../components/Chat/Conversations/Conversations";
import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  return (
    <Fragment>
      <Conversations />
      <Chat />
    </Fragment>
  );
};

export default ChatPage;
