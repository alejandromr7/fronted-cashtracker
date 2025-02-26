import LoginForm from '@/components/auth/LoginForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cashtracker - Inicia Sesion',
  description: 'Cashtracker - Inicia Sesion'
}

export default function Page() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'> Inicia Sesion</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>

      <LoginForm />

      <nav className="flex mt-10 flex-col space-y-4">
        <Link href='/auth/register' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>Aún no tienes una cuenta. {' '}
          <span className="text-purple-950 font-bold">Regístrate ahora para comenzar.</span>
        </Link>
        <Link href='/auth/forgot-password' className='max-w-max mx-auto font-medium text-gray-600 text-center capitalize'>¿Olvidaste tu contraseña? {' '}
          <span className="text-purple-950 font-bold">Reestablece tu contraseña</span>
        </Link>
      </nav>

    </div>
  );
}
