import RegisterForm from '@/components/auth/RegisterForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cashtracker - Registro',
  description: 'Cashtracker - Registro'
}

export default function RegisterPage() {

  console.log('RegisterPage rendered')
  return (
    <>
      <h1 className='font-black text-6xl text-purple-950 capitalize'>Crea tu cuenta</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>


      <RegisterForm />

      <nav className="flex mt-10 flex-col space-y-4">
        <Link href='/auth/login' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>Ya tienes una cuenta. {' '}
          <span className="text-purple-950 font-bold">Iniciar Sesion.</span>
        </Link>
        <Link href='/auth/forgot-password' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>¿Olvidaste tu contraseña? {' '}
          <span className="text-purple-950 font-bold">Reestablece tu contraseña</span>
        </Link>
      </nav>

    </>
  );
}
