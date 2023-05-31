import { useContext } from "react";
import Context from "./Context";

export const useItemsContext = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};
