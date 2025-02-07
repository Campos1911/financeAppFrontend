import React, { useState } from "react";
import { FaMinus, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionsProps } from "@/app/dashboard/page";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { SelectCategoriaEdit } from "../Select";
import { IoFastFoodOutline } from "react-icons/io5";

const CardTransaction = ({
  transaction,
}: {
  transaction: TransactionsProps;
}) => {
  const { toast } = useToast();
  const [editTransaction, setEditTransaction] = useState<
    Omit<TransactionsProps, "descricao">
  >({
    valor: null,
    data: "",
    categoria: "",
  });
  const dataObj = new Date(editTransaction.data);

  const getTransactionData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/get/transacao/find/${transaction.id}`
      )
      .then((res) => {
        const dataRecebida = new Date(res.data.data);
        setEditTransaction({
          ...res.data,
          data: dataRecebida.toISOString().split("T")[0],
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: `${err}`,
          className: "text-white",
          variant: "destructive",
        });
      });
  };

  const handleDeleteTransaction = async () => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/transacao/${transaction.id}`
      )
      .then(() => {
        toast({
          title: "Sucesso",
          description: "Transação excluída com sucesso",
          className: "bg-green-600 border-transparent text-white",
          duration: 3000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
  };
  const handleEditTransaction = async () => {
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit/transacao/${transaction.id}`,
        {
          valor: editTransaction.valor,
          data: dataObj.toISOString(),
          categoria: editTransaction.categoria,
        }
      )
      .then(() => {
        toast({
          title: "Sucesso",
          description: `Transação editada. A página será recarregada`,
          className: "text-white bg-green-600 border-transparent",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger
          onClick={() => getTransactionData()}
          className="outline-none"
        >
          <div className="bg-white/80 hover:bg-white duration-200 rounded-lg flex items-center justify-between p-2">
            <div className="flex gap-3">
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full ${
                  (transaction.valor as number) > 0
                    ? "bg-green-500"
                    : transaction?.valor === 0
                    ? "bg-gray-500"
                    : "bg-red-500"
                }`}
              >
                {(transaction.valor as number) > 0 ? <FaPlus /> : <FaMinus />}
              </div>
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full bg-blue-500`}
              >
                {transaction.categoria === "comida" ? (
                  <IoFastFoodOutline />
                ) : (
                  <FaMoneyBillWave />
                )}
              </div>
            </div>
            <p className="text-black">{transaction.descricao}</p>
            <p className="text-black">R${transaction.valor}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Faça suas alterações</DialogTitle>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center border border-slate-500 p-1 rounded-lg outline-none w-full bg-white">
                <p className="text-lg">R$</p>
                <input
                  className="rounded-lg outline-none w-full"
                  type="number"
                  value={editTransaction.valor ?? ""}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      valor: parseInt(e.target.value),
                    })
                  }
                  placeholder="Novo valor"
                />
              </div>
              <div className="flex justify-between gap-2">
                <SelectCategoriaEdit
                  editTransaction={editTransaction}
                  setEditTransaction={setEditTransaction}
                />
                <input
                  className="flex gap-1 items-center border border-slate-500 p-1 rounded-lg outline-none bg-white"
                  type="date"
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      data: e.target.value,
                    })
                  }
                  value={editTransaction.data}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="flex gap-3">
            <DialogClose
              onClick={() => handleEditTransaction()}
              className="p-1 px-4 outline-none bg-green-500 shadow-md hover:bg-green-800 duration-200 rounded-lg text-white"
            >
              Salvar
            </DialogClose>
            <DialogClose
              onClick={() => handleDeleteTransaction()}
              className="p-1 px-4 outline-none bg-red-500 shadow-md hover:bg-red-800 duration-200 rounded-lg text-white"
            >
              Excluir
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardTransaction;
