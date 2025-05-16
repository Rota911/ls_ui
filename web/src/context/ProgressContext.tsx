import { createContext, useContext, useState } from "react";

interface ProgressContextType {
  hasActiveProgress: boolean;
  setHasActiveProgress: (value: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasActiveProgress, setHasActiveProgress] = useState(false);

  return (
    <ProgressContext.Provider
      value={{ hasActiveProgress, setHasActiveProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("ProgressProvider position!");
  return context;
};
