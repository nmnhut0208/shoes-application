import { useContext } from "react";
import Context from "./Context";
import { setDefaultHeader } from "./actions";

export const useTaskContext = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};

export const resetHeader = (dispatch) => {
  dispatch(setDefaultHeader("Header"));
};
