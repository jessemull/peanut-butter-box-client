import { isValidPhoneNumber } from 'libphonenumber-js'

export const isValidZipCode = (zipCode: string): boolean => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)

export const isValidNumber = (phoneNumber: string): boolean => isValidPhoneNumber(phoneNumber, 'US') || isValidPhoneNumber(phoneNumber, 'CA')
