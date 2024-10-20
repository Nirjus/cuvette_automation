/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { Loader, Mail, Phone, User, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationLayout from "../Authentication";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { Button } from "@/components/ui/button";
import { ShowAlert } from "@/components/ui/alertBox";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { signUpUrl } from "@/redux/API_end_points";


const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    value,
    error,
    handleEmailChange,
    handlecompanyNameChange,
    handleNameChange,
    handlephoneNumberChange,
    handleemployeeSizeChange,
    resetState,
  } = useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !error.name &&
        !error.email &&
        !error.companyName &&
        !error.employeeSize &&
        !error.phoneNumber
      ) {
        setIsLoading(true);
       
        await axios
          .post(
            signUpUrl,
            {
              name: value.name,
              email: value.email,
              companyName: value.companyName,
              employeeSize: value.employeeSize,
              phoneNumber: value.phoneNumber,
            },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            resetState(
              "name",
              "email",
              "phoneNumber",
              "companyName",
              "employeeSize"
            );
            setErrorMessage("");
            navigate("/verify-email");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      {errorMessage && !isLoading && (
        <ShowAlert message={errorMessage} status={"error"} />
      )}
      <div className="max-w-md w-full border border-blue-500 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className=" text-3xl mb-1 font-bold text-center">Sign Up</h2>
          <p className=" mb-6 text-center text-gray-500 text-sm">
            Create you account here
          </p>
          <form action="" onSubmit={handleSubmit}>
            <Input
              icon={User}
              type="text"
              placeholder="Name"
              value={value.name}
              onChange={handleNameChange}
              error={error.name}
            />
            {/* Recaptcha container - Invisible Recaptcha */}
            <div id="recaptcha-container"></div>
            <Input
              icon={Phone}
              type="number"
              placeholder="Phone Number"
              value={value.phoneNumber}
              onChange={handlephoneNumberChange}
              error={error.phoneNumber}
            />
            <Input
              icon={User}
              type="text"
              placeholder="Company Name"
              value={value.companyName}
              onChange={handlecompanyNameChange}
              error={error.companyName}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="company email"
              value={value.email}
              onChange={handleEmailChange}
              error={error.email}
            />
            <Input
              icon={Users}
              type="number"
              placeholder="Employee size"
              value={value.employeeSize}
              onChange={handleemployeeSizeChange}
              error={error.employeeSize}
            />
            <p className=" text-center text-sm py-2 text-gray-500">
              By clicking on proceed you wil accept our
              <span className="block text-blue-700">Terms & Conditions </span>
            </p>
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition duration-200 shadow-lg w-full mt-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className=" animate-spin " />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-500/30 flex justify-center">
          <p className=" text-sm ">
            Already have an account?{" "}
            <Link className=" text-blue-500 hover:underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(SignUp);
