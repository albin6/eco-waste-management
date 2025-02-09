import { User } from "@/types";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const PaymentComponent = ({
  user,
  onConfirm,
  amount,
}: {
  user: User;
  onConfirm: (razorpay_payment_id: string) => void;
  amount: number;
}) => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options: RazorpayOrderOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "",
      description: "",
      order_id: "", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        onConfirm(response.razorpay_payment_id);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      {!isLoading && (
        <button onClick={handlePayment} disabled={isLoading}>
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentComponent;
