import Template from "../components/Template";
import signupImg from "../assets/signup.png";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Sign Up for a Personalized Shopping"
      description1="Join us today and enjoy personalized recommendations, express checkout."
      description2="Unlock a world of exclusive deals and seamless shopping."
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
