import { createContext } from "react";

export enum CellType {
  Circle = "circle",
  Square = "square",
  Rhombus = "rhombus",
}

export interface CellOption {
  id: string;
  type: CellType;
  color: string;
  order: number;
  combination: string;
}

interface BoardContextProps {
  selectedCells: CellOption[];
  onSelectCell: (cell: CellOption) => void;
}

export const BoardContext = createContext({} as BoardContextProps);
