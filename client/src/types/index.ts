export type UserData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  __v: number;
};

export type Transaction = {
  _id: string;
  transactionId: string;
  userId: UserData;
  to: number;
  amount: number;
  transactionType: "credit" | "debit";
  date: string; // ISO string format
  __v: number;
};

export interface User {
  id: number;
  name: string;
  email: string;
}
