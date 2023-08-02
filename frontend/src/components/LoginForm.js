import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch} from "react-redux";
import { loggedInUser } from "../redux/slices/currentUser";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import { set } from "../redux/slices/cartSlice";


const LoginForm = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
        
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
              method: "POST",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify(formData),
            });
            const response = await res.json();
            console.log(response.data);
            if (res.status === 401) {
                toast.error("User Not Found");
            }else if (res.status === 403) {
                toast.error("Incorrect Password");
            }else if (res.status === 200){
                dispatch(set(response.data.cart));
                console.log(response);
                toast.success(`Welcome ${response.data.firstname} ${response.data.lastname}`);
                dispatch(loggedInUser(response.data));
                dispatch(setIsLoggedIn(true));
                navigate("/");
            }
            
          } catch (err) {
            console.log(err);
            toast.error("Internal Server Error");
          }
    }

    return (
        <>
        <form
            onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6 text-left"
        >
            <label htmlFor="" className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] text-left">
                    Email Address
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type="email"
                    required
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={changeHandler}
                    name="email"
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />
            </label>

            <label htmlFor="" className="w-full relative text-left">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    name="password"
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />

                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer "
                >
                    {showPassword ? (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    )}
                </span>

                <Link to="#">
                    <p className="text-xs mt-1 text-blue-600 max-w-max ml-auto">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className="bg-yellow-50 hover:bg-yellow-400 duration-200 py-[8px] px-[12px] rounded-[8px] mt-4 font-semibold text-richblack-900">
                Sign in
            </button>
        </form>
        <p className="mt-2 w-full text-[#420c3e] font-bold flex justify-center items-baseline gap-1">Dont Have an Account: <Link to='/signup'><button className="bg-[#615c5b] hover:bg-[#723232] rounded-md text-white transition duration-200 ease-linear mt-2 border-green-600 font-bold px-2 py-1 text-sm mr-5">Sign Up</button></Link></p>
        </>
    );
};

export default LoginForm;
