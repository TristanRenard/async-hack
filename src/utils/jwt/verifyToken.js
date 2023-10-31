export default async function verifyToken(token) {
    const jwt = require('jsonwebtoken')
    //check if token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            return decoded
        }
    } catch (err) {
        return false
    }
    return false
}
