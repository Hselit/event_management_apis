import { addAttendeeResponse } from "./attendee.dto";

export type eventResponse = {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  venueId: string;
};

export type addEventResponse = string | eventResponse;

export type addEventRequest = Pick<eventResponse, "date" | "title" | "description" | "venueId">;

export type updateEventRequest = Partial<addEventRequest>;

export type getEventsResponse = eventResponse[];

export type getEventResponse = eventResponse | null;

export type getEventAttendees = {
  Attendee: Omit<addAttendeeResponse, "id">;
}[];
