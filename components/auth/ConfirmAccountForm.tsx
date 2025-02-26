'use client'

import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ConfirmAccountForm() {

  const [isCompleted, setIsCompleted] = useState(false);
  const [token, setToken] = useState('');


  useEffect(() => {
    if (isCompleted) {
      console.log(token);
    }
  }, [isCompleted])

  const handleChange = (token: string) => {
    setToken(token);
    setIsCompleted(false)
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
