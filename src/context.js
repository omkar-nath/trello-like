import { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer/reducer";

const StateContext = createContext(null);
const DispatchContext = createContext(null);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default Provider;
export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
