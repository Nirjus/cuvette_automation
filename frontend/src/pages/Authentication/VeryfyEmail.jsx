/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthenticationLayout from "../Authentication";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Mail, Phone } from "lucide-react";
import { ShowAlert } from "@/components/ui/alertBox";
import toast from "react-hot-toast";
import axios from "axios";
import { registerUrl } from "@/redux/API_end_points";
import Input from "@/components/ui/Input";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/utils/firebase";

const OTP_LENGTH = 6;

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (emailOtp.length === OTP_LENGTH) {
        setIsLoading(true);
        await axios
          .post(
            registerUrl,
            {
              randomKey: emailOtp,
            },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            setErrorMessage("");
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
   function onSignUp(){
    if(!phoneOTP){
      return;
    }
     onCaptchaVerify()
     const appVerifier = window.recaptchaVerifier;
     const phoneNumber = "+91" + phoneOTP;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast.success("OTP send successfully 👍")
      setShowOtp(true);
    }).catch((error) => {
      // toast.error(error);
      console.log(error);
    });
  }
  function onCaptchaVerify(){
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
         onSignUp()
        },
        'expired-callback': () => {}
      });
    }
  }
  function onOTPVerify(){
    window.confirmationResult.confirm(otp).then(async (res) => {
      console.log(res);
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    })
    
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      {error && !isLoading && <ShowAlert message={error} status={"error"} />}
      <div className=" flex items-center space-x-5 bg-yellow-400/20  rounded-lg overflow-hidden mb-2 p-4 ">
        <AlertTriangle size={20} className=" text-yellow-500 ml-2" />
        <p className=" text-sm text-yellow-500">
          Token will expaire in limited time.
        </p>
      </div>
      <div className="max-w-md w-full border border-blue-500 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className=" text-3xl mb-1 font-bold text-center">Sign Up</h2>
          <p className=" mb-6 text-center text-gray-500 text-sm">
            Verify to complete registration process
          </p>
          <div id="recaptcha-container" />
          <form onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              type={"number"}
              placeholder={"Enter 6 digits Email OTP"}
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              error={""}
            />
            <Button
              className="bg-indigo-500 mb-8 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            {
              showOtp ?   <>
              <Input
                 icon={Phone}
                 type={"number"}
                 placeholder={"Enter phone OTP"}
                 value={otp}
                 onChange={(e) => setOtp(e.target.value)}
                 error={""}
               />
               <Button
                 className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full"
                 type="button"
                 onClick={onOTPVerify}
                 disabled={isLoading}
               >
                 {isLoading ? <Loader2 className=" mx-auto w-4 h-4 animate-spin" /> : "Verify"}
               </Button>
              </> :  <>
           <Input
              icon={Phone}
              type={"number"}
              placeholder={"Enter your mobile no. to get OTP"}
              value={phoneOTP}
              onChange={(e) => setPhoneOTP(e.target.value)}
              error={""}
            />
            <Button
              className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full"
              type="button"
              onClick={onSignUp}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className=" mx-auto w-4 h-4 animate-spin" /> : "Get OTP"}
            </Button>
           </>
            }
       
         
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(VerifyEmail);
