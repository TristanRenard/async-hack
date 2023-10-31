var bcrypt = require('bcryptjs')

/**
 * @description Hash a password
 * @param {String} password
 * @returns hash
 */

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hashSync(password, salt)
}

export default hashPassword
