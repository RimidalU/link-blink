export class User {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
