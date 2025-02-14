'use server'
import {RegisterSchema, SuccessSchema} from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
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
            errors,
            success: prevState.success
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

    if(req.status === 409){
        return {
            errors: ['El email ya esta en uso'],
            success: ''
        }
    }

    const json = await req.json();
    const success= SuccessSchema.parse(json);
    return {
        errors: [],
        success
    }
}
