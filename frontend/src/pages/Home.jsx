import { logoutUrl } from "@/redux/API_end_points";
import { logoutSuccess } from "@/redux/Reducers/AuthSlice";
import axios from "axios";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      if (user) {
        await axios
          .post(logoutUrl, {}, { withCredentials: true })
          .then((res) => {
            toast.success(res.data.message);
            dispatch(logoutSuccess());
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full flex px-3 py-4 justify-between h-screen bg-fuchsia-500">
      <div className=" bg-white rounded-lg h-fit w-fit p-2">
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div
        className=" bg-white w-8 h-8 rounded-full flex cursor-pointer justify-center items-center"
        onClick={handleLogout}
      >
        <LogOut size={20} />
      </div>
    </div>
  );
};

export default Home;
