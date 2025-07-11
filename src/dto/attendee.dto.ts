export type addAttendeeResponse = {
  id: string;
  name: string;
  email: string;
  registeredAt: Date;
};

export type addAttendeeRequest = Pick<addAttendeeResponse, "name" | "email" | "registeredAt">;

export type getAttendeesResponse = addAttendeeResponse[];
