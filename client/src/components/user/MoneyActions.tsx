import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, SendHorizontal } from "lucide-react";
import PaymentConfirmationModal from "../modal/PaymentConfirmationModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PaymentConfirmationModalWith from "../modal/PaymentConfirmationModalWithRecepient";

interface MoneyActionsProps {
  onAddMoney: (amount: number, razorpay_payment_id: string) => void;
  onSendMoney: (amount: number, razorpay_payment_id: string) => void;
}

const MoneyActions: React.FC<MoneyActionsProps> = ({
  onAddMoney,
  onSendMoney,
}) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [amount, setAmount] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleConfirm = (razorpay_payment_id: string) => {
    console.log("Payment Confirmed!");
    setIsModalOpen(false);
    setAmount("");
    onAddMoney(Number(amount), razorpay_payment_id);
  };

  const handleSendConfirm = (razorpay_payment_id: string) => {
    setIsSendModalOpen(false);
    setAmount("");
    onSendMoney(Number(amount), razorpay_payment_id);
  };

  const handleAddMoney = () => {
    const numAmount = Number.parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setIsModalOpen(true);
    } else {
      alert("Please enter a valid amount");
    }
  };

  const handleSendMoney = () => {
    const numAmount = Number.parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setIsSendModalOpen(true);
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full"
      />
      <div className="flex space-x-4">
        <Button onClick={handleAddMoney} className="flex-1">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Money
        </Button>
        <Button
          onClick={handleSendMoney}
          variant="outline"
          className="flex-1"
          disabled={user.role !== "master"}
        >
          <SendHorizontal className="mr-2 h-4 w-4" /> Send Money
        </Button>
      </div>
      <PaymentConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        amount={Number(amount)}
        recipient={user}
      />

      <PaymentConfirmationModalWith
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onConfirm={handleSendConfirm}
        amount={Number(amount)}
      />
    </div>
  );
};

export default MoneyActions;
