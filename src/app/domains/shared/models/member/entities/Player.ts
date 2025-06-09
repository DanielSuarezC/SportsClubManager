import { Club } from "../../club/entities/club"
import { User } from "../../user/entities/User"

export class Player extends User{
    club: Club;
}