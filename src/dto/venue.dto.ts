export type addVenueResponse = {
  id: string;
  name: string;
  address: string;
  capacity: number;
};

export type addVenueRequest = Omit<addVenueResponse, "id">;

export type getVenuesResponse = addVenueResponse[];

export type getVenueResponse = addVenueResponse | string;

export type checkVenueResponse = string | null;

export type getVenueReponse = addVenueResponse | null;
