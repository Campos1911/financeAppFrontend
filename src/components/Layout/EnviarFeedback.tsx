import { FeedbackProps } from "@/app/dashboard/page";
import React, { useState } from "react";
import { StarRating } from "@/components/Rating/StarRating";
import axios from "axios";
import { useDecodeToken } from "@/hooks/useToken";
import { useToast } from "@/hooks/use-toast";

const EnviarFeedback = () => {
  const token = useDecodeToken();
  const [feedback, setFeedback] = useState<FeedbackProps>({
    descricao: "",
    nota: 0,
  });
  const { toast } = useToast();
  const handleSendFeedback = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/create/feedback`, {
        nota: feedback.nota,
        descricao: feedback.descricao,
        usuarioId: parseInt(token.id),
      })
      .then(() => {
        toast({
          title: "Sucesso",
          description: `Feedback registrado, obrigado! A página será recarregada`,
          className: "text-white bg-green-600 border-transparent",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro",
          description: `${
            error.response.data === '"descricao" is not allowed to be empty'
              ? "A descrição não pode estar vazia!"
              : "Não foi possível registrar o feedback"
          }`,
          variant: "destructive",
          className: "text-white",
        });
      });
  };
  return (
    <div className="w-full flex flex-col h-full justify-between bg-black/20 p-3">
      <p className="text-3xl">Deixe seu feedback e peça melhorias:</p>
      <div className="flex flex-col gap-3">
        <div className=" flex gap-3 items-center">
          <p className="text-lg">Qual seu nível de satisfação?</p>
          <StarRating feedback={feedback} setFeedback={setFeedback} />
        </div>
        <input
          type="text"
          className="w-full p-2 rounded-lg outline-none text-black"
          placeholder="Conte o que achou da ferramenta"
          value={feedback.descricao}
          onChange={(e) =>
            setFeedback({ ...feedback, descricao: e.target.value })
          }
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => handleSendFeedback()}
          className="bg-green-600 p-3 px-8 rounded-lg shadow-lg hover:bg-green-800 duration-200"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default EnviarFeedback;
