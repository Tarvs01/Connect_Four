import React from "react";
import { CellDetails } from "../types";
import { motion } from "framer-motion";

function Cell({ row, player, column }: CellDetails) {
  return (
    <motion.div
      className={`cell${row}${column}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: `${player === 1 ? "red" : "yellow"}`,
        borderRadius: "inherit",
        position: "absolute",
        bottom: `${row * 50 + row * 15}px`,
        zIndex: 2,
      }}
      animate={{
        bottom: `0px`,
      }}
      transition={{ duration: row * 0.1 }}
    ></motion.div>
  );
}

export default Cell;
