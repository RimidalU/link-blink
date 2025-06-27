import { User } from '../user'

interface CreateUserParams {
    username: string
    email: string
    password: string
}

export class UserFactory {
    create(params: CreateUserParams): User {
        const { username, email, password } = params
        const id = -1
        const dateNow = new Date()

        return new User(id, username, email, password, dateNow, dateNow)
    }
}
