import { customAlphabet } from 'nanoid'

const ALPHABET =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const ALIAS_LENGTH = 7

const nanoid = customAlphabet(ALPHABET, ALIAS_LENGTH)

const generateAlias = (): string => {
    return nanoid()
}

export { generateAlias }
