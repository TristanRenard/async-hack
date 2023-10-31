import { PrismaClient } from '@prisma/client'
import hashPassword from '@/utils/hashPassword'

const prisma = new PrismaClient()
export default async function findUser(email) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if (user) {
        return user
    }

    return false
}
