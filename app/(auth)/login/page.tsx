import React from 'react'

import LoginForm from '@/auth/components/LoginForm'

export default function Login() {
  return (
    <div className="w-2/4 mx-auto">
    <h1 className="text-3xl font-bold text-center">Login</h1>

    <LoginForm />
  </div>
  )
}