import { Club } from "../../club/entities/club";
import { User } from "../../user/entities/User"

export class Coach extends User{
    club: Club;
}