import { TransactionsProps } from "@/app/dashboard/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategoria = ({
  newTransaction,
  setNewTransaction,
}: {
  newTransaction: TransactionsProps;
  setNewTransaction: React.Dispatch<React.SetStateAction<TransactionsProps>>;
}) => {
  return (
    <Select
      onValueChange={(e) =>
        setNewTransaction({ ...newTransaction, categoria: e })
      }
    >
      <SelectTrigger className="h-full rounded-lg outline-none w-full bg-white">
        <SelectValue placeholder="Categoria" className="text-gray-200" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="entrada">Entrada</SelectItem>
        <SelectItem value="comida">Comida</SelectItem>
        <SelectItem value="fixo">Gasto Fixo</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCategoria;
