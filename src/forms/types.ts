
export type FormField = {
    display: string;
    value: string;
    type?: string;
}

export type RegisterForm = {
    firstName: FormField;
    lastName: FormField;
    email: FormField;
    username: FormField;
    password: FormField;
}
