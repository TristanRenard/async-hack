var bcrypt = require('bcryptjs')

/**
 *
 * @param {string} hash
 * @param {string} password
 * @returns Boolean
 */

const validatePassword = async (hash, password) => {
    const compare = await bcrypt.compare(password, hash)
    return compare
}

export default validatePassword
