'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function Login() {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState(null)
    const [singUp, setSingUp] = useState('Sign up')

    const jwt = require('jsonwebtoken')

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = fetch('/api/jwt/verifyToken', {
                method: 'POST',
                body: JSON.stringify({
                    usertoken: localStorage.getItem('token'),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        window.location.href = '/'
                    } else {
                        localStorage.removeItem('token')
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSingUp('Loading...')
        const { email, password } = e.target.elements

        const body = {
            login: {
                email: email.value,
                password: password.value,
            },
        }

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        //

        const data = await res.json()

        if (data.status === 200) {
            console.log(data.usertoken)
            if (data.usertoken !== false) {
                localStorage.setItem('token', data.usertoken)
                window.location.href = '/'
            } else {
                setError('Wrong password')
                setIsOpen(true)
                setSingUp('Log in')
            }
        } else {
            setError(data.err)
            setIsOpen(true)
            setSingUp('Log in')
        }
    }

    return (
        <main className="bg-white flex flex-col h-full ">
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white border px-16 py-10 border-black">
                        <Dialog.Title className="text-black font-bold text-lg">
                            Error :
                        </Dialog.Title>

                        <Dialog.Description className="text-black">
                            {error}
                        </Dialog.Description>
                        <button
                            className="bg-emerald-600 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 mt-8"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="/api/users/connect"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="p-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-800 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-primary hover:text-secondary text-emerald-600"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="p-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-800 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-emerald-600 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a
                            href="register"
                            className="font-semibold leading-6 text-primary hover:text-secondary"
                        >
                            Register here.
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}
