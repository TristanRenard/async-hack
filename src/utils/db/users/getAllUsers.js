import { PrismaClient } from '@prisma/client'
import hashPassword from '@/utils/hashPassword'

const prisma = new PrismaClient()
export default async function findUser(email) {
    const users = await prisma.user.findMany()

    if (users) {
        return users
    }

    return false
}
