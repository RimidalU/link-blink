class CreateLinkCommand {
    constructor(
        public readonly originalUrl: string,
        public readonly alias?: string,
        public readonly expiresAt?: Date
    ) {}
}

export { CreateLinkCommand }
