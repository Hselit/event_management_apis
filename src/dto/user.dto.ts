export type userRequest = {
  username: string;
  password: string;
};

export type userResponse = userRequest & {
  role: string;
  id: string;
};
