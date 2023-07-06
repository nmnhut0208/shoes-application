import { PhanSo } from "~common_tag/reports";
import styles from "./SizeColumnInPrint.module.scss";

const SizeColumnInPrint = ({ list_tuso, list_mauso, fontSize }) => {
  return (
    <div className={styles.group_phanso}>
      {list_tuso.map((tuso, index) => (
        <PhanSo tuso={tuso} mauso={list_mauso[index]} fontSize={fontSize} />
      ))}
    </div>
  );
};

export default SizeColumnInPrint;
