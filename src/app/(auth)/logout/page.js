'use client'

export default function Logout() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
            localStorage.removeItem('token')
        }
        window.location.href = '/'
    }
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}
