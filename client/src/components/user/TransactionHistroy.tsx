import type React from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "../../types/index";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction._id}>
            <TableCell>
              {moment(transaction.date).format("MMMM Do YYYY, h:mm:ss a")}
            </TableCell>
            <TableCell>{transaction.userId.name}</TableCell>
            <TableCell>{transaction.transactionId}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.transactionType}</TableCell>
            <TableCell
              className={`text-right ${
                transaction.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionHistory;
