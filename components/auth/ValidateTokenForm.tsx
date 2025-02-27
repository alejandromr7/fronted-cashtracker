import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

interface Props {
  setIsValidToken: Dispatch<SetStateAction<boolean>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({ setIsValidToken, setToken, token }: Props) {


  const [isComplete, setIsComplete] = useState(false);

  const validateTokenInput = validateToken.bind(null, token)

  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: ''
  });


  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete])

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      setIsValidToken(true)
      toast.success(state.success);
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  }

  const handleComplete = () => {
    setIsComplete(true);
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}