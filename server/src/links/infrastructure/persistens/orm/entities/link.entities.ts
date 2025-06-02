import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm'

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    shortCode: string

    @Column()
    originalUrl: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ default: 0 })
    clickCount: number

    @Column('simple-array', { nullable: true })
    lastIps?: string[]

    @Column({ nullable: true })
    expiresAt?: Date
}
