export class UpdateEmailCommand {
    constructor(
        public readonly id: string,
        public readonly email: string
    ) {}
}
