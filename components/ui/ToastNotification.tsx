'use client'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ToastNotification() {
  return (
    <ToastContainer position="top-right" autoClose={5000} pauseOnFocusLoss={false} pauseOnHover={false} />
  );
};
