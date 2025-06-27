export class UpdateUsernameCommand {
    constructor(
        public readonly id: number,
        public readonly username: string
    ) {}
}
