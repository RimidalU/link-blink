import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm'

@Entity('links')
export class LinkEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    alias: string

    @Column()
    originalUrl: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ default: 0 })
    clickCount: number

    @Column('text', { array: true, nullable: true })
    lastIps?: string[]

    @Column({ nullable: true })
    expiresAt?: Date
}
