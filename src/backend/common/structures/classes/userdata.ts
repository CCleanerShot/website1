import { AmazonItem } from "./amazonitem";
export class UserData {
    username: string;
    password: string;
    items: AmazonItem[];

    constructor(
    username: string,
    password: string,
    items: AmazonItem[] = []
    ) {
        this.username = username;
        this.password = password;
        this.items = items;
    }
}
