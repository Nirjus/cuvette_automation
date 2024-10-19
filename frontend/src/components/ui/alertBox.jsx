import { AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function ShowAlert({ message, status }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-green-400/30 backdrop-blur-xl backdrop-filter rounded-lg overflow-hidden mb-2 ",
        status === "error" && "bg-red-400/20"
      )}
    >
      <Alert variant={status === "success" ? "success" : "error"}>
        {status === "success" ? (
          <CheckCircle color="green" className="h-4 w-4" />
        ) : (
          <AlertCircle color="red" className="h-4 w-4" />
        )}
        <AlertTitle>{status === "success" ? "Success" : "Error"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
