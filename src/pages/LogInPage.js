import LogInForm from "../components/Auth/LogIn/LogInForm";
import GrayBackground from "../components/UI/Background/GrayBackground";
import Card from "../components/UI/Card/Card";

const LogInPage = () => {
  return (
    <GrayBackground>
      <Card
        styles={{
          width: "32rem",
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -20%)",
        }}
      >
        <LogInForm />
      </Card>
    </GrayBackground>
  );
};

export default LogInPage;
