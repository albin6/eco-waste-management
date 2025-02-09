import mongoose from "mongoose";

export interface Transaction {
  transactionId: string;
  userId: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  amount: number;
  transactionType: "debit" | "credit";
  date: Date;
}
