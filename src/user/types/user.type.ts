export type UserType = {
  name: string;
  email: string;
  password: string;
};

export interface ErrorType {
  message: string;
  type: string;
}
