import { TransactionsProps } from "@/app/dashboard/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategoriaEdit = ({
  editTransaction,
  setEditTransaction,
}: {
  editTransaction: Omit<TransactionsProps, "descricao">;
  setEditTransaction: React.Dispatch<
    React.SetStateAction<Omit<TransactionsProps, "descricao">>
  >;
}) => {
  return (
    <Select
      onValueChange={(e) =>
        setEditTransaction({ ...editTransaction, categoria: e })
      }
    >
      <SelectTrigger className="flex gap-1 items-center border border-slate-500 p-1 rounded-lg outline-none w-full bg-white">
        <SelectValue
          placeholder={`Editar Categoria`}
          className="text-gray-200"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="entrada">Entrada</SelectItem>
        <SelectItem value="comida">Comida</SelectItem>
        <SelectItem value="fixo">Gasto Fixo</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCategoriaEdit;
