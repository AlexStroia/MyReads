import React, { createContext, useContext } from "react";

const DependencyContext = createContext();

export const useDependencies = () => useContext(DependencyContext());

export const DependencyProvider = ({ dependencies, children }) => (
  <DependencyContext.Provider value={dependencies}>
    {children}
  </DependencyContext.Provider>
);
