import { Club } from "../../club/entities/club";
import { User } from "../../user/entities/User"

export class ClubAdministrator extends User{
    club: Club;
}