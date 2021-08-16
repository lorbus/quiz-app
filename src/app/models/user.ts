export class User {
    mail: string;
    password: string;
    name: string;
    lastname: string;
    role: string;

    constructor(data: any) {
        data = data || {};
        this.mail = data.mail;
        this.password = data.password;
        this.name = data.name;
        this.lastname = data.lastname;
        this.role = data.role;
    }
}
