"use client";

import { CardDashboard, CardTransaction } from "@/components/Card";
import {
  EnviarFeedback,
  Header,
  RegistrarGasto,
} from "@/components/Layout/index";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDecodeToken } from "@/hooks/useToken";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface TransactionsProps {
  id?: number;
  valor: number | null;
  data: string;
  descricao?: string;
  categoria: string;
  usuarioId?: number;
}

export interface FeedbackProps {
  descricao: string;
  nota: number;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const token = useDecodeToken();
  const [saldo, setSaldo] = useState<number>(0);
  const [newTransaction, setNewTransaction] = useState<TransactionsProps>({
    valor: null,
    data: "",
    descricao: "",
    categoria: "",
    usuarioId: parseInt(token.id),
  });
  useEffect(() => {
    const getTransactions = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/get/transacao/${token.id}`)
        .then((response) => setTransactions(response.data));
    };
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const getSaldo = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/get/saldo/${token.id}`)
        .then((response) => setSaldo(response.data.data));
    };
    getSaldo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  return (
    <div className="flex flex-col gap-5 bg-zinc-700 text-white h-screen p-5">
      <Header />
      <RegistrarGasto
        newTransaction={newTransaction}
        transactions={transactions}
        setTransactions={setTransactions}
        setNewTransaction={setNewTransaction}
      />
      <div className="flex w-full gap-5">
        <div className="flex flex-col gap-2 w-full bg-black/20 p-3">
          <p>Gastos desse mês:</p>
          <ScrollArea className="h-72 pr-3 ">
            <div className="flex flex-col gap-2">
              {transactions.map((transaction, index) => (
                <CardTransaction key={index} transaction={transaction} />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-2 gap-3 w-full bg-black/20 p-3">
              <CardDashboard title="Saldo Atual" saldo={saldo} />
              <CardDashboard
                title="Quantidade de transações"
                saldo={transactions.length}
              />
            </div>
          </div>
          <EnviarFeedback />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
