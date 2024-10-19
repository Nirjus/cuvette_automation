/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import AuthenticationLayout from "../Authentication";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { loginSuccess } from "@/redux/Reducers/AuthSlice";
import { ShowAlert } from "@/components/ui/alertBox";
import toast from "react-hot-toast";
import axios from "axios";
import { loginUrl } from "@/redux/API_end_points";

const Login = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { value, error, handleEmailChange, handlePasswordChange, resetState } =
    useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!error.email && !error.password) {
        setIsLoading(true);
        await axios
          .post(
            loginUrl,
            {
              email: value.email,
              password: value.password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            dispatch(loginSuccess(res.data.user));
            setErrorMessage("");
            resetState("email", "password");
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
          <h2 className=" text-3xl font-bold mb-1 text-center ">Sign In</h2>
          <p className=" text-sm text-gray-500 text-center mb-6">
            Login to your account from here
          </p>
          <form action="" onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={value.email}
              onChange={handleEmailChange}
              error={error.email}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={value.password}
              onChange={handlePasswordChange}
              error={error.password}
            />

            <div className=" w-full px-4 mb-4 mt-[-5px]">
              <Link
                to={"/forgot-password"}
                className=" text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full mt-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className=" animate-spin " />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-500/30 flex justify-center">
          <p className=" text-sm">
            Dont have any account?{" "}
            <Link className=" text-blue-500 hover:underline" to={"/signUp"}>
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(Login);
