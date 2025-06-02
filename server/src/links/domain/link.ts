class Link {
    constructor(
        public id: number,
        public shortCode: string,
        public originalUrl: string,
        public createdAt: Date,
        public clickCount: number,
        public lastIps?: string[],
        public expiresAt?: Date
    ) {}
}

export { Link }
