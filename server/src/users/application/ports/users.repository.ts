import { User } from '@src/users/entities/user.entity'

export abstract class UsersRepository {
    abstract create(user: User): Promise<string>
    abstract findById(id: number): Promise<User | null>
    abstract updateUsername(id: string, username: string): Promise<string>
    abstract updateEmail(id: string, email: string): Promise<string>
    abstract updatePassword(id: string, password: string): Promise<string>
    abstract delete(id: string): Promise<string>
}
