import { Role } from "./user/entities/Role";

export interface paylod {
    sub: string;
    authorities: string;
    username: string;
    exp: number;
    iat: number;
}

export interface Authority {
  authority: string;
}

