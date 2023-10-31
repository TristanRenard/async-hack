import { NextResponse } from 'next/server'

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? ['https://example.com']
        : ['http://localhost:3000']

export default function middleware(req) {
    const origin = req.headers.get('origin')
    if ((origin && !allowedOrigins.includes(origin)) || !origin) {
        return NextResponse.json(null, {
            status: 403,
            statusText: 'Forbidden',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'],
}
