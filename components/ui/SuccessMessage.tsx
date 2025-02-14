
export default function SuccessMessage({ children }:{ children:React.ReactNode }) {
    return (
        <div className="bg-green-500 text-white text-center p-3 rounded-lg">
            {children}
        </div>
    )
}