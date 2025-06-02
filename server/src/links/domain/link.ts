class Link {
    constructor(
        private id: number,
        private shortCode: string,
        private originalUrl: string,
        private createdAt: Date,
        private clickCount: number,
        private lastIps?: string[],
        private expiresAt?: Date
    ) {}
}

export { Link }
