import React from "react";
import PaymentComponent from "../payment/RazorpayPayment";
import { User } from "@/types";
import { Button } from "../ui/button";

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (razorpay_payment_id: string) => void;
  amount: number;
  recipient: User;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipient,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Payment
        </h2>
        <p className="text-gray-600">
          Are you sure you want to send{" "}
          <span className="font-medium">${amount.toFixed(2)}</span> to{" "}
          <span className="font-medium">{recipient.name}</span>?
        </p>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <Button>
            <PaymentComponent
              amount={amount}
              onConfirm={onConfirm}
              user={recipient}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
