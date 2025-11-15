'use client'

import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'

function LoginFormWrapper() {
  return <LoginForm />
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginFormWrapper />
        </Suspense>
      </div>
    </div>
  )
}

