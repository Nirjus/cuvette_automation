import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const Input = ({
  icon: Icon,
  type,
  onChange,
  value,
  error,
  placeholder,
  correct = false,
}) => {
  return (
    <div className=" relative mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-black" />
      </div>
      <input
        type={type}
        required
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={cn(
          " w-full pl-10 pr-3 py-2 bg-gray-300/30 rounded-lg border border-gray-300/70 focus:border-gray-600/80 outline-none focus:ring-1 focus:ring-gray-200  placeholder-gray-500 transition duration-200",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        )}
      />
      <p className="absolute left-5 top-[45px] text-red-500 font-medium text-xs">
        {error}
      </p>
      {correct && (
        <div className=" absolute top-2 right-3 cursor-pointer">
          <CheckCircle2 fill="green" color="white" />
        </div>
      )}
    </div>
  );
};

export default Input;
