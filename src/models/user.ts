export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}

export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}

export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;

    constructor(id: number, fn: string, ln: string, email: string, un: string, pw: string) {
        this.id = id;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.username = un;
        this.password = pw;
    }

}