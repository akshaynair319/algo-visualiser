import React, { useContext, useReducer } from "react";
import { reducer } from "../utils/reducer";
import { ACTIONS } from "../utils/actions";
import { getInitialState } from "../utils/initialState";
const AppContext = React.createContext();

const initialState = getInitialState();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //function for undoing last action
  const undo = () => {
    dispatch({ type: ACTIONS.UNDO });
  };
  //function for clearing the board
  const clearAll = () => {
    dispatch({ type: ACTIONS.DELETE });
  };

  //function for clearing the progress of the algorithm
  const refresh = () => {
    dispatch({ type: ACTIONS.REFRESH });
  };

  //function for locking and unlocking the graph (saving user from unnecessary mistakes)
  const toggleLock = () => {
    dispatch({ type: ACTIONS.TOGGLE_LOCK });
  };

  const updatePoints = (width, height) => {
    dispatch({ type: ACTIONS.MAKEEDGE, payload: { width, height } });
  };

  //handles the event when we click on a cell
  const makeNode = (index) => {
    dispatch({ type: ACTIONS.MAKENODE, payload: index });
  };

  //changes algorithm
  const changeAlgo = (algo) => {
    refresh();
    dispatch({ type: ACTIONS.CHANGEALGO, payload: algo });
  };

  const startVisualisation = () => {
    if (state.currentAlgo === "") return;
    if (state.currentAlgo === "bfs")
      dispatch({ type: ACTIONS.VISUALISE, payload: "bfs" });
    if (state.currentAlgo === "dfs")
      dispatch({ type: ACTIONS.VISUALISE, payload: "dfs" });
    if (state.currentAlgo === "dijktras")
      dispatch({ type: ACTIONS.VISUALISE, payload: "dijktras" });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        undo,
        refresh,
        clearAll,
        toggleLock,
        makeNode,
        updatePoints,
        changeAlgo,
        startVisualisation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
