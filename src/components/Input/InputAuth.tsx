import React from "react";

export interface InputAuthInterface {
  type: string;
  nome: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputAuth = ({ nome, type, value, setValue }: InputAuthInterface) => {
  return (
    <div className="w-full">
      <p>{nome}:</p>
      <input
        type={`${type}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full outline-none p-2 rounded-lg text-black shadow-lg"
      />
    </div>
  );
};

export default InputAuth;
