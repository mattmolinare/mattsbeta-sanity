import { createContext } from "react";

export const ReportMoveContext = createContext<
  ((key: string, direction: "up" | "down") => void) | undefined
>(undefined);
