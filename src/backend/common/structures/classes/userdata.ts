
export class UserData {
    username: string;
    password: string;
    items: string[];

    constructor(
    username: string,
    password: string,
    items: string[] = []
    ) {
        this.username = username;
        this.password = password;
        this.items = items;
    }
}
