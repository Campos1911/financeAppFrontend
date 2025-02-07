import React from "react";

export interface CardDashboardProps {
  title: string;
  saldo: number;
}

const CardDashboard = ({ title, saldo }: CardDashboardProps) => {
  if (title === "Quantidade de transações") {
    return (
      <div className="flex flex-col w-full p-2 border border-white/20 rounded-lg hover:bg-white/20 duration-200">
        <p className="w-full text-center">{title}</p>
        <div className="flex justify-center items-center text-3xl h-full">
          {saldo}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-2 border border-white/20 rounded-lg hover:bg-white/20 duration-200">
      <p className="w-full text-center">{title}</p>
      <div
        className={`${
          saldo > 0 ? "text-green-500" : "text-red-500"
        } flex justify-center items-center text-3xl h-full`}
      >
        R${saldo}
      </div>
    </div>
  );
};

export default CardDashboard;
