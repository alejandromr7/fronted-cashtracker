import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Cashtracker - Iniciar Sesion',
    description: 'Cashtracker - Iniciar Sesion',
}

import React from 'react'

export default function Login() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Iniciar Sesion</h1>
            <p className='text-3xl font-bold'>y controla tus <span className="text-amber-500">finanzas</span></p>

            <LoginForm />


            <nav className="mt-10 flex flex-col space-y-4">
                <Link href="/auth/register" className="text-center text-gray-500">
                    Sign Up for a New Account
                </Link>
                <Link href="/auth/forgot-password" className="text-center text-gray-500">
                    Forgot Your Password?
                </Link>
            </nav>

        </>
    )
}
