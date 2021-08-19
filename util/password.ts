import PasswordValidator from 'password-validator'

const validator = new PasswordValidator()

validator
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()

const getPasswordErrorMessages = (list: Array<string>): Array<string> => {
  const messages: Array<string> = []
  if (list.indexOf('min') > -1) {
    messages.push('Password is less than 8 characters')
  }
  if (list.indexOf('max') > -1) {
    messages.push('Password is greater than 100 characters')
  }
  if (list.indexOf('lowercase') > -1) {
    messages.push('Password must contain one lowercase letter')
  }
  if (list.indexOf('uppercase') > -1) {
    messages.push('Password must contain one uppercase letter')
  }
  if (list.indexOf('digits') > -1) {
    messages.push('Password must contain at least two digits')
  }
  if (list.indexOf('spaces') > -1) {
    messages.push('Password may not contain any spaces')
  }
  return messages
}

export {
  getPasswordErrorMessages,
  validator
}
