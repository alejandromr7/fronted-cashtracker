export default function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-green-700 p-4 rounded-lg text-white text-center capitalize'>
      {children}
    </div>
  );
};

