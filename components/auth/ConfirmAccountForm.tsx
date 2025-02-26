'use client'

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ConfirmAccountForm() {

  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [token, setToken] = useState('');

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (isCompleted) {
      dispatch();
    }
  }, [isCompleted])

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/admin');
        }
      });
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsCompleted(false)
    setToken(token);
  }

  const handleComplete = () => {
    setIsCompleted(true);
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput value={token} onChange={handleChange} onComplete={handleComplete} >
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 placeholder-white shadow text-center" />
      </PinInput>
    </div>
  );
};
