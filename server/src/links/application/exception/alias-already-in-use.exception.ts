import { ConflictException } from '@nestjs/common'

export class AliasAlreadyInUseException extends ConflictException {
    constructor(alias: string) {
        super(`Alias '${alias}' is already in use.`)
    }
}
