export interface IUser {
  _id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  emailVerified?: boolean;
  createDate?: Date;
}
