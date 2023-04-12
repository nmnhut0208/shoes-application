import { useContext } from "react";
import ContextTable from "./ContextTable";

export const useTableContext = () => {
  console.log("useContext(ContextTable) ne: ", useContext(ContextTable))
  const [state, dispatch] = useContext(ContextTable);
  return [state, dispatch];
};
