export interface IUserBasic {
  readonly id?: number;
  readonly email: string;
  password: string;
}

export interface IUser extends IUserBasic {
  username: string;
}
