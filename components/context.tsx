import React, { FC, useCallback, useMemo } from "react";

export interface State {
  isTransitioning: boolean;
}

const initialState = {
  isTransitioning: true,
};

type Action = {
  type: "SET_IS_TRANSITIONING";
  payload: boolean;
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_IS_TRANSITIONING": {
      return {
        isTransitioning: action.payload,
      };
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setIsTransitioning = useCallback(
    (payload: boolean) => dispatch({ type: "SET_IS_TRANSITIONING", payload }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      setIsTransitioning,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC = ({ children }) => <UIProvider>{children}</UIProvider>;
