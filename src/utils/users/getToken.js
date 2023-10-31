import findUser from '../db/users/findUser'
import validatePassword from '../validatePassword'
require('dotenv').config()

const jwt = require('jsonwebtoken')
export default async function getToken(email, password) {
    const user = await findUser(email)
    // console.log(user)

    if (user) {
        const { password: hash } = user
        const isValid = await validatePassword(hash, password)

        if (isValid) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    admin: user.admin,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            )
            return token
        }
    }
}
