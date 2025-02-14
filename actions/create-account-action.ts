'use server'

import { RegisterSchema } from "@/src/schemas"

export async function register(formData: FormData) {
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    // Validar 
    const register = RegisterSchema.safeParse(registerData);

    if (!register.success) {
        const errors = register.error.errors.map(error => error.message);
        console.log(errors);
        return {

        }
    }

    // Registrar 
    const url = `${process.env.API_URL}/auth/create-account`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: registerData.email,
            name: registerData.name,
            password: registerData.password
        })
    });

    const json = await req.json();
    console.log(json)
}
