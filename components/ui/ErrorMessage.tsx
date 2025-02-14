import React from "react";


export default function ErrorMessage({ children }:{ children:React.ReactNode }) {
    return (
        <div className="bg-red-500 text-white text-center p-3 rounded-lg">
            {children}
        </div>
    )

}