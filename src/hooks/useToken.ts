import { jwtDecode } from "jwt-decode";

export interface DecodeProps {
  id: string;
}

export const useDecodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { id: "" };
  }
  const decoded = jwtDecode<DecodeProps>(token as string);
  return decoded;
};
