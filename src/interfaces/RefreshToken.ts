export interface IRefreshToken {
  _id?: string;
  secret: string;
  accessId: string;
  expiresIn: number;
}
