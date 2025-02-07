import { TransactionsProps } from "@/app/dashboard/page";
import { useToast } from "@/hooks/use-toast";
import { useDecodeToken } from "@/hooks/useToken";
import axios from "axios";
import React from "react";
import { SelectCategoria } from "../Select";

const InputTransaction = ({
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
  const { toast } = useToast();
  const token = useDecodeToken();
  const handleRegisterTransaction = async () => {
    const dataObj = new Date(newTransaction.data);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/create/transacao`, {
        valor: newTransaction.valor,
        data: dataObj.toISOString(),
        descricao: newTransaction.descricao,
        categoria: newTransaction.categoria,
        usuarioId: token.id,
      })
      .then((res) => {
        setTransactions([...transactions, res.data]);
        setNewTransaction({
          valor: null,
          data: "",
          categoria: "",
          descricao: "",
        });
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: `${err}`,
          className: "text-white",
          variant: "destructive",
        })
      );
  };
  return (
    <div className="flex gap-5 w-full justify-between text-black">
      <div className="flex gap-1 items-center p-1 rounded-lg outline-none w-full bg-white">
        <p className="text-lg">R$</p>
        <input
          className="p-1 rounded-lg outline-none w-full"
          type="number"
          value={newTransaction.valor ?? ""}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              valor: parseFloat(e.target.value),
            })
          }
        />
      </div>
      <input
        className="p-1 rounded-lg outline-none w-full"
        type="date"
        value={newTransaction.data}
        onChange={(e) =>
          setNewTransaction({ ...newTransaction, data: e.target.value })
        }
      />
      <input
        className="p-1 pl-3 rounded-lg outline-none w-full"
        type="text"
        value={newTransaction.descricao}
        placeholder="Descrição..."
        onChange={(e) =>
          setNewTransaction({ ...newTransaction, descricao: e.target.value })
        }
      />
      <SelectCategoria
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
      />
      <button
        onClick={() => handleRegisterTransaction()}
        className="bg-green-600 text-white p-2 px-4 rounded-lg hover:bg-green-800 duration-200"
      >
        Criar
      </button>
    </div>
  );
};

export default InputTransaction;
