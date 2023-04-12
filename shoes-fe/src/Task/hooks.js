import { useContext } from "react";
import Context from "./Context";

export const useTaskContext = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};
