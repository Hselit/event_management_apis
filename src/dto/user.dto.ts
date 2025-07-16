export type userRequest = {
  username: string;
  password: string;
};

export type userResponse =
  | (userRequest & {
      role: string;
      id: string;
    })
  | string;

export type userBaseResponse = {
  username: string;
  password: string;
  role: string;
  id: string;
};

export type getUserResponse = userBaseResponse | null;

export type userListResponse = userBaseResponse[] | string;
