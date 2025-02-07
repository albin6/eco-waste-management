export interface User {
  _id?: Object;
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}
