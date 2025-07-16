export type addAttendeeResponse = {
  id: string;
  name: string;
  email: string;
  registeredAt: Date;
};

export type addAttendeeRes = addAttendeeResponse | string;

export type addAttendeeRequest = Pick<addAttendeeResponse, "name" | "email">;

export type getAttendeesResponse = addAttendeeResponse[];

export type eventAttendeeResponse = {
  attendee: addAttendeeResponse[];
};

export type getAttendeeDetails = Omit<addAttendeeResponse, "id">[];

export type getEventAttendeeResponse = {
  totalCount: number;
  attendee: Omit<addAttendeeResponse, "id">[];
};

export type getEventAttResponse = getEventAttendeeResponse | string;

export type getAttendeeResponse = addAttendeeResponse | null;
