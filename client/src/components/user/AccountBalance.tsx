import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-semibold mb-2">Account Balance</h3>
        <p className="text-4xl font-bold text-green-600">
          ${balance.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
