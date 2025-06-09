export class LinkClick {
    constructor(
        public readonly id: number,
        public readonly alias: string,
        public readonly ipAddress: string,
        public readonly createdAt: Date
    ) {}
}
