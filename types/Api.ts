// src/modules/user/user.interfaces.ts
interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

// src/modules/token/token.interfaces.ts
interface TokenPayload {
  token: string;
  expires: string; // Date;
}

interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}

export type LoginResponse = {
  user: IUser;
  tokens: AccessAndRefreshTokens;
};
