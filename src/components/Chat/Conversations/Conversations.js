import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userActions } from "../../../store/user-slice";
import useHttp from "../../../hooks/use-http";

const Conversations = () => {
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
    <section>
      {convos.map((user) => (
        <div key={user._id} onClick={handleLoadConvo.bind(null, user._id)}>
          <img src={`http://localhost:8080/${user.profileImage}`} />
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      ))}
    </section>
  );
};

export default Conversations;
