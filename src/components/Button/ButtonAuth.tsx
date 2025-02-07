import React, { FormEvent } from "react";

export interface ButtonAuthInterface {
  content: string;
  handleClick: (e: FormEvent) => void;
}

const ButtonAuth = ({ content, handleClick }: ButtonAuthInterface) => {
  return (
    <div>
      <button
        onClick={(e) => handleClick(e)}
        className="bg-green-600 p-3 px-10 rounded-lg shadow-lg hover:bg-green-800 duration-200"
      >
        {content}
      </button>
    </div>
  );
};

export default ButtonAuth;
