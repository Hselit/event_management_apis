export type addAttendeeResponse = {
  id: string;
  name: string;
  email: string;
  registeredAt: Date;
};

export type addAttendeeRequest = Pick<addAttendeeResponse, "name" | "email">;

export type getAttendeesResponse = addAttendeeResponse[];

export type eventAttendeeResponse = {
  attendee: addAttendeeResponse[];
};
