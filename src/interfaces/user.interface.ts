export interface User {
    username: string;
    password: string;
    role: "admin" | "manager" | "employee";
}
