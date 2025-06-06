import { Authority } from "./Authority";

export class Role{
    id: number;
    name: string;
    authorities?: Authority[];

    constructor(name: string) {
        this.name = name;
    }
}

