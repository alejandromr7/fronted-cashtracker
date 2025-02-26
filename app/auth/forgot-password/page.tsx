import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cashtracker - Olvidé mi Contraseña',
  description: 'Cashtracker - Olvidé mi Contraseña'
}

export default function ForgotPasswordPage() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Olvidé mi Contraseña</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>

      <ForgotPasswordForm />


      <nav className="flex mt-10 flex-col space-y-4">
        <Link href='/auth/login' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>Ya tienes una cuenta. {' '}
          <span className="text-purple-950 font-bold">Iniciar Sesion.</span>
        </Link>
        <Link href='/auth/register' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>Aún no tienes una cuenta. {' '}
          <span className="text-purple-950 font-bold">Regístrate ahora para comenzar.</span>
        </Link>
      </nav>

    </div>
  );
}
