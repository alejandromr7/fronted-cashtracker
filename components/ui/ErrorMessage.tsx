export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-red-500 p-4 rounded-lg text-white text-center capitalize'>
      {children}
    </div>
  );
};

