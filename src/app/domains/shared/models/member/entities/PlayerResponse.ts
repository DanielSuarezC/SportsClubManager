import { Role } from "../../user/entities/Role";

export class PlayerResponse{
    id: number;
    nationalId: number;
    name: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    username: string;
    Role: Role[];
}