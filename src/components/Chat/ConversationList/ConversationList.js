import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convoActions } from "../../../store/convo-slice";
import Conversation from "../Conversations/ConversationItem/ConversationItem";
import useHttp from "../../../hooks/use-http";
import Loader from "../../UI/Loader/Loader";
import styles from "./Conversations.module.css";

const ConversationList = () => {
  const { sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const convos = useSelector((state) => state.convo.convoList);
  const allConvos = useSelector((state) => state.convo.allConvoList);
  const convoSearch = useSelector((state) => state.convo.searchConvoList);
  const token = useSelector((state) => state.auth.token);
  const [checkConvoList, setCheckConvoList] = useState(false);

  const id = useMemo(() => {
    return params.get("id");
  }, [params]);

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
        dispatch(convoActions.setConvoList(data.convos));
        dispatch(convoActions.setAllConvoList(data.allUsers));
        setCheckConvoList(true);
      }
    );
  }, []);

  useEffect(() => {
    if (id && !convos.find((convo) => convo._id === id)) {
      const newConvo = allConvos.find((convo) => convo._id === id);
      dispatch(convoActions.addToConvoList(newConvo));
      dispatch(convoActions.sortConvoList(id));
      setCheckConvoList(false);
    }
  }, [checkConvoList, id]);

  const handleLoadConvo = (recipientId) => {
    dispatch(convoActions.sortConvoList(recipientId));
    navigate(`/user/chat?id=${recipientId}`);
  };

  return (
    <div className={styles.conversationList}>
      {isLoading && <Loader styles={{ left: "15%" }} />}
      {convoSearch !== "" &&
        allConvos
          .filter((convo) => {
            const name = `${convo.firstName} ${convo.lastName}`;
            return name.toLowerCase().includes(convoSearch.toLowerCase());
          })
          .map((convo) => (
            <Conversation
              key={convo._id}
              user={convo}
              active={convo._id === id}
              onLoadConvo={handleLoadConvo}
            />
          ))}
      {convoSearch === "" &&
        convos[0] &&
        convos.length > 0 &&
        convos.map((convo) => (
          <Conversation
            key={convo._id}
            user={convo}
            active={convo._id === id}
            onLoadConvo={handleLoadConvo}
          />
        ))}
    </div>
  );
};

export default ConversationList;
