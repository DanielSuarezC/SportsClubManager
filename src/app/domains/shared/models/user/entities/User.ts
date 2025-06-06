import { AffiliationStatus } from "./AffiliationStatus";
import { Role } from "./Role";

export class User{
     id?: number;
     nationalId: number;
     name: string;
     lastName: string;
     phoneNumber: number;
     email: string;
     username: string;
     password: string;
     enabled?: boolean;
     admin?: boolean;
     roles: Role[];
     affiliationStatus?: AffiliationStatus;
}