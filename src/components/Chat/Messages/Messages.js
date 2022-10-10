import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

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
    <div>
      {convo &&
        convo.messages.map((message) => (
          <p key={message._id}>{message.content}</p>
        ))}
    </div>
  );
};

export default Messages;
