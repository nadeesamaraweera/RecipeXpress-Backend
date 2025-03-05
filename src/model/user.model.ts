export interface User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
}

export interface CreateUserInput {
    email: string;
    password: string;
}