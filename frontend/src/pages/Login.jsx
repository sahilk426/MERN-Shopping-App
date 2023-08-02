import Template from "../components/Template";
import loginImg from "../assets/login.png";

function Login({ setIsLoggedIn }) {
  return (
    <Template
      title="Welcome Back"
      description1="Log in now to continue your shopping adventure with us."
      description2="Shop smarter and easier with us."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Login;
