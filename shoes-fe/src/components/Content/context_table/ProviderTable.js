import { useReducer } from "react";
import ContextTable from "./ContextTable";
import reducer, { initState } from "./reducer";

function ProviderTable({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <ContextTable.Provider value={[state, dispatch]}>
      {children}
    </ContextTable.Provider>
  );
}

export default ProviderTable;
