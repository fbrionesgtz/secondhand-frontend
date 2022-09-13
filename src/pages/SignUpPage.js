import GrayBackground from "../components/UI/Background/GrayBackground";
import Card from "../components/UI/Card/Card";
import SignUpForm from "../components/Auth/SignUp/SignUpForm";

const SignUpPage = () => {
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
        <SignUpForm />
      </Card>
    </GrayBackground>
  );
};

export default SignUpPage;
