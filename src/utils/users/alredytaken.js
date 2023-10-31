//verify in db if username is already taken

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function isUsernameTaken(email) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if (user) {
        return true
    }

    return false
}
