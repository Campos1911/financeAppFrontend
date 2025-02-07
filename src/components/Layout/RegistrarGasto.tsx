import React from "react";
import { InputTransaction } from "@/components/Input";
import { TransactionsProps } from "@/app/dashboard/page";

const RegistrarGasto = ({
  newTransaction,
  setNewTransaction,
  transactions,
  setTransactions,
}: {
  newTransaction: TransactionsProps;
  setNewTransaction: React.Dispatch<React.SetStateAction<TransactionsProps>>;
  transactions: TransactionsProps[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionsProps[]>>;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full bg-black/20 p-3">
      <p>Registrar um novo gasto:</p>
      <InputTransaction
        newTransaction={newTransaction}
        transactions={transactions}
        setNewTransaction={setNewTransaction}
        setTransactions={setTransactions}
      />
    </div>
  );
};

export default RegistrarGasto;
