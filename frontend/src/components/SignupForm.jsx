import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { loggedInUser } from "../redux/slices/currentUser";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number:"",
    password: "",
    confirmPassword: "",
    address:""
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClick = (buttonName) => {
    setShowPassword({
      ...showPassword,
      [buttonName]: !showPassword[buttonName],
    });
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const finalData = {
      ...formData
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/createAccount`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(finalData),
      });
      if (res.status === 200){
          console.log(finalData);
          dispatch(loggedInUser(finalData));
          dispatch(setIsLoggedIn(true));
          toast.success(`Welcome ${finalData.firstname} ${finalData.lastname}`);
          navigate("/");
          console.log(res);
      }else if (res.status === 503) {
        toast.error("Error in hasing password");
      }else if (res.status === 500) {
        toast.error("User Already Exists");
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  return (
    <div className="mt-8">
      {/* Form */}
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="firstname"
              id="firstName"
              onChange={changeHandler}
              value={formData.firstname}
              placeholder="Enter first name"
            />
          </label>

          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="lastname"
              id="lastName"
              onChange={changeHandler}
              value={formData.lastname}
              placeholder="Enter last name"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={changeHandler}
          />
        </label>
        <label className="w-full">
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            Mobile Number<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
            required
            type="number"
            name="number"
            id="number"
            value={formData.number}
            placeholder="Enter Mobile Number"
            onChange={changeHandler}
          />
        </label>
        <div className="flex gap-x-4">
          <label className="w-full relative">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Choose Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.password ? "text" : "password"}
              name="password"
              id="createPassword"
              onChange={changeHandler}
              value={formData.createPassword}
              placeholder="Enter Password"
            />

            <span
              className="absolute top-[38px] right-3 z-10 cursor-pointer"
              onClick={() => handleClick("password")}
            >
              {showPassword.password ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
          </label>
          <label className="w-full relative">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
            />

            <span
              className="absolute top-[38px] right-1.5 z-10 cursor-pointer"
              onClick={() => handleClick("confirmPassword")}
            >
              {showPassword.confirmPassword ? (
                <AiOutlineEye/>
              ) : (
                <AiOutlineEyeInvisible  />
              )}
            </span>
          </label>
          
        </div>
        <div>
        <label className="w-full">
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            Address<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
            required
            type="address"
            name="address"
            id="address"
            value={formData.address}
            placeholder="Enter Complete Address"
            onChange={changeHandler}
          />
        </label>       
        </div>
        
        <button className="bg-yellow-300 hover:bg-yellow-400 duration-200 text-richblack-900 font-semibold px-[12px] rounded-[8px] py-[8px] mt-4">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
