import { model, Schema } from "mongoose";

export const walletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
});

export const WalletModel = model("Wallet", walletSchema);
