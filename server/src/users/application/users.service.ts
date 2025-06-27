import { Injectable } from '@nestjs/common'

import { User } from '../entities/user.entity'
import { UserFactory } from '../domain/factories/user.factory'

import { CreateUserCommand } from './commands/create-user.command'
import { FindUserByIdCommand } from './commands/find-user-by-id.command'
import { UsersRepository } from './ports/users.repository'
import { UpdateUsernameCommand } from './commands/update-username.command'
import { UpdateEmailCommand } from './commands/update-email.command'
import { UpdatePasswordCommand } from './commands/update-password.command'
import { DeleteUserCommand } from './commands/delete-user.command'

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly userFactory: UserFactory
    ) {}

    create(createUserDto: CreateUserCommand): Promise<string> {
        const { username, email, password } = createUserDto

        const newUser = this.userFactory.create({ username, email, password })

        return this.usersRepository.create(newUser)
    }

    async findById(findUserByIdDto: FindUserByIdCommand): Promise<User | null> {
        return this.usersRepository.findById(findUserByIdDto.id)
    }

    async updateUsername(
        updateUserDto: UpdateUsernameCommand
    ): Promise<string> {
        const { id, username } = updateUserDto
        return this.usersRepository.updateUsername(id, username)
    }

    async updateEmail(updateEmailDto: UpdateEmailCommand): Promise<string> {
        const { id, email } = updateEmailDto

        return this.usersRepository.updateEmail(id, email)
    }

    async updatePassword(
        updatePasswordDto: UpdatePasswordCommand
    ): Promise<string> {
        const { id, password } = updatePasswordDto

        return this.usersRepository.updatePassword(id, password)
    }

    async delete(deleteUserDto: DeleteUserCommand): Promise<string> {
        return this.usersRepository.delete(deleteUserDto.id)
    }
}
