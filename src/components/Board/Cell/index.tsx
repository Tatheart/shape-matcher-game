import React, { useContext } from "react";
import { BoardContext, CellOption } from "../context";
import classes from "./Cell.module.scss";
import clsx from "clsx";

interface CellProps {
  cell: CellOption;
  open: boolean;
  onSelect?: (cell: CellOption) => void;
}

const Cell: React.FC<CellProps> = ({ cell, open, onSelect }) => {
  return (
    <div className={classes.root}>
      {open ? (
        <div
          className={clsx(classes.main, classes[cell.type])}
          style={{ backgroundColor: cell.color }}
        ></div>
      ) : (
        <div onClick={() => onSelect?.(cell)} className={classes.closed}>
          ?
        </div>
      )}
    </div>
  );
};

export default Cell;
