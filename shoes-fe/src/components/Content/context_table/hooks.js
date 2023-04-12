import { useContext } from "react";
import ContextTable from "./ContextTable";

export const useTableContext = () => {
  const [state, dispatch] = useContext(ContextTable);
  return [state, dispatch];
};
