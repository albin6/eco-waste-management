import { model, Schema } from "mongoose";

export const walletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const WalletModel = model("Wallet", walletSchema);
