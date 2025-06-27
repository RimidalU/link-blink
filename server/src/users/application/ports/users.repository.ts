import { User } from '@src/users/entities/user.entity'

export abstract class UsersRepository {
    abstract create(user: User): Promise<string>
    abstract findById(id: number): Promise<User | null>
    abstract updateUsername(id: number, username: string): Promise<string>
    abstract updateEmail(id: number, email: string): Promise<string>
    abstract updatePassword(id: number, password: string): Promise<string>
    abstract delete(id: number): Promise<string>
}
