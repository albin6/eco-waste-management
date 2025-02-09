import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountBalance from "./AccountBalance";
import MoneyActions from "./MoneyActions";
import TransactionHistory from "./TransactionHistroy";
import Header from "./Header";
import { axiosInstance } from "@/api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Transaction } from "@/types";

const ClientDashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useSelector((state: RootState) => state.user.userInfo._id);

  async function getAccountBalance() {
    try {
      const response = await axiosInstance.get("/wallet/balance", {
        params: { userId },
      });

      console.log(response.data);
      setBalance(response.data.wallet.balance);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await axiosInstance.get("/transactions", {
        params: { userId },
      });
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAccountBalance();
    getTransactions();
  }, []);

  const handleAddMoney = async (
    amount: number,
    razorpay_payment_id: string
  ) => {
    try {
      const response = await axiosInstance.put("/wallet/balance", {
        userId,
        balance: amount,
      });

      const responseTransaction = await axiosInstance.post("/transactions", {
        transactionId: razorpay_payment_id,
        userId,
        to: 9876543210,
        amount,
        transactionType: "credit",
      });

      console.log(response.data);
      if (response.data.success) {
        getAccountBalance();
      }
      if (responseTransaction.data.success) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMoney = (amount: number) => {
    // if (balance >= amount) {
    //   setBalance((prevBalance) => prevBalance - amount);
    //   const newTransaction: Transaction = {
    //     id: Date.now(),
    //     date: new Date().toISOString().split("T")[0],
    //     description: "Sent Money",
    //     amount: -amount,
    //   };
    //   setTransactions((prevTransactions) => [
    //     newTransaction,
    //     ...prevTransactions,
    //   ]);
    // } else {
    //   alert("Insufficient balance");
    // }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="p-6 space-y-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AccountBalance balance={balance} />
                <MoneyActions
                  onAddMoney={handleAddMoney}
                  onSendMoney={handleSendMoney}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionHistory transactions={transactions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
