import { useState, useEffect } from "react";
import TableThuChi from "./TableThuChi";
import styles from "./ThuChi.module.scss";
import { Table } from "@mui/material";

const tables = {
  option1: <TableThuChi option={"option1"} />,
  option2: <TableThuChi option={"option2"} />,
  option3: <TableThuChi option={"option3"} />,
};

const ThuChi = () => {
  const [selectedTable, setSelectedTable] = useState("option1");

  return (
    <>
      <input
        type="radio"
        id="option1"
        name="option"
        value="option1"
        checked={selectedTable === "option1"}
        onChange={() => setSelectedTable("option1")}
      />
      <label for="option1">Tất cả</label>
      <input
        type="radio"
        id="option2"
        name="option"
        value="option2"
        checked={selectedTable === "option2"}
        onChange={() => setSelectedTable("option2")}
      />
      <label for="option2">Phiếu thu</label>
      <input
        type="radio"
        id="option3"
        name="option"
        value="option3"
        checked={selectedTable === "option3"}
        onChange={() => setSelectedTable("option3")}
      />
      <label for="option3">Phiếu chi</label>
      {tables[selectedTable]}
    </>
  );
};

export default ThuChi;
