export class UpdateEmailCommand {
    constructor(
        public readonly id: number,
        public readonly email: string
    ) {}
}
