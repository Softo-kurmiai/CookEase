export interface User {
    id: number;
    name: string;
    email: string;
    profilePicture: string | null;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    profilePicture: string | null;
    password: string | null;
    version: number;
}