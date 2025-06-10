import { Link } from './link'

export class LinkClick {
    constructor(
        public readonly id: number,
        public readonly ipAddress: string,
        public readonly createdAt: Date,

        public readonly link: Link
    ) {}
}
