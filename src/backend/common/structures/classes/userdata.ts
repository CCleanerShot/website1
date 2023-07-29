import { ItemData } from "../types/itemdata";

export class UserData {
    username: string;
    password: string;
    items: ItemData[];

    constructor(
    username: string,
    password: string,
    items: ItemData[] = []
    ) {
        this.username = username;
        this.password = password;
        this.items = items;
    }
}
