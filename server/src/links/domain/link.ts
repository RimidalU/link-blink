export class Link {
    constructor(
        public id: number,
        public alias: string,
        public originalUrl: string,
        public createdAt: Date,
        public expiresAt?: Date
    ) {}
}
