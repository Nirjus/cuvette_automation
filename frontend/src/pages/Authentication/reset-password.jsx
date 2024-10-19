/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import AuthenticationLayout from "../Authentication";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { ShowAlert } from "@/components/ui/alertBox";
import axios from "axios";
import { resetPassworUrl } from "@/redux/API_end_points";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    value,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
    resetState,
  } = useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!error.password && !error.confirmPassword) {
        setIsLoading(true);
        await axios
          .put(
            `${resetPassworUrl}/${token}`,
            {
              token,
              newPassword: value.password,
              confirmPassword: value.confirmPassword,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            resetState("password", "confirmPassword");
            setErrorMessage("");
            navigate("/login", { replace: true });
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
      <div className="max-w-md w-full bg-sky-950 bg-opacity-50 backdrop-blur-xl backdrop-filter rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className=" text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-indigo-500 text-transparent bg-clip-text">
            Reset Password
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <Input
              icon={Lock}
              type="password"
              placeholder="New Password"
              value={value.password}
              onChange={handlePasswordChange}
              error={error.password}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              value={value.confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={error.confirmPassword}
            />

            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full mt-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Set new Password"}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(ResetPassword);
