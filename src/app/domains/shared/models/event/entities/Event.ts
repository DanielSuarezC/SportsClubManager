import { EventVisibility } from './EventVisibility';

export class Event{
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    eventVisibility: EventVisibility;
    maximumParticipants: number;
}