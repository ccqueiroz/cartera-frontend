export type AuthDTO = {
  email: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
};

export type RegisterAuthDTO = {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: number | null;
  updatedAt: number | null;
  id: string;
  fullName: string;
};

export type RecoverPasswordAuthDTO = {
  email: string;
};
