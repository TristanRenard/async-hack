import { PrismaClient } from '@prisma/client'
import hashPassword from '@/utils/hashPassword'

const prisma = new PrismaClient()
export default async function insertUser(username, password, email) {
    const hash = await hashPassword(password)
    const user = await prisma.user.create({
        data: {
            name: username,
            password: hash,
            email,
        },
    })

    return user
}

//emai@email.com
