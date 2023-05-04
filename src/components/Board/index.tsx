import React, { useMemo, useState } from "react";
import classes from "./Board.module.scss";
import { orderBy, random, sampleSize, sortBy, times, uniqueId } from "lodash";
import Cell from "./Cell";
import { BoardContext, CellOption, CellType } from "./context";

const PAIRS = 8;

const COLORS = ["#32a852", "#0396ff", "#fa0223"];

const Board = () => {
  const [selectedCells, setSelectedCells] = useState<CellOption[]>([]);
  const [completedCombinations, setCompletedCombinations] = useState<string[]>(
    []
  );

  const onSelectCell = (cell: CellOption) => {
    switch (selectedCells.length) {
      case 0:
        return setSelectedCells([cell]);
      case 1:
        setSelectedCells((prev) => [...prev, cell]);
        if (cell.combination === selectedCells[0].combination) {
          setCompletedCombinations((prev) => [...prev, cell.combination]);
          return setSelectedCells([]);
        }
        return setTimeout(() => {
          setSelectedCells([]);
        }, 1000);
      default:
        break;
    }
    if (selectedCells.length >= 2) return;
    setSelectedCells((prevState) => [...prevState, cell]);
  };

  const cells = useMemo(() => {
    const combinations = Object.values(CellType).flatMap((type, index) =>
      COLORS.map((color, idx) => ({
        color,
        type,
        combination: `${color}:${type}`,
      }))
    );

    const randomCombinations = sampleSize(combinations, PAIRS);

    return sortBy(
      randomCombinations.flatMap((combination) => {
        const orders = [random(0, PAIRS * 2), random(0, PAIRS * 2)];
        return [
          {
            ...combination,
            order: orders[0],
            id: uniqueId(),
          },
          {
            ...combination,
            order: orders[1],
            id: uniqueId(),
          },
        ];
      }),
      (item) => item.order
    );
  }, []);

  return (
    <BoardContext.Provider value={{ selectedCells, onSelectCell }}>
      <div className={classes.root}>
        {cells.map((cell, idx) => {
          const open =
            completedCombinations.includes(cell.combination) ||
            selectedCells.some((item) => item.id === cell.id);

          return (
            <Cell onSelect={onSelectCell} open={open} cell={cell} key={idx} />
          );
        })}
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
