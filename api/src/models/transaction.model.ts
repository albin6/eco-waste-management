import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  transactionId: string;
  userId: mongoose.Schema.Types.ObjectId;
  to: number;
  amount: number;
  transactionType: "debit" | "credit";
  date: Date;
  wallet: mongoose.Schema.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Refers to the User collection
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["debit", "credit"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
});

export const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
